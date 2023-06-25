const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { controllerWrapper } = require("../decorators");
const cloudinary = require("cloudinary").v2; 
// const {uploader} = require("../middlewares");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  res.status(200).json({
    name: user.name,
    email: user.email,
    avatarURL: user.avatarURL,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  console.log(req.user);
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const avatarsCloud = async (req, res) => {
  const fileStr = req.file.path;
  const upload = await cloudinary.v2.uploader.upload(fileStr, {
    upload_preset: 'avatars', }) 
    const avatarURL = upload.secure_url
  return res.json({
    success: true,
    avatarURL,
  });
}

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  avatarsCloud: controllerWrapper(avatarsCloud),
};
