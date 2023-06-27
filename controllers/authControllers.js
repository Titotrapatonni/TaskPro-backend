const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { controllerWrapper } = require('../decorators');
const cloudinary = require('cloudinary').v2;

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
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
    throw HttpError(401, 'Email or password is wrong');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      theme: user.theme,
    },
  });
};

const getCurrent = async (req, res) => {
  const { name, email, avatarURL, theme } = req.user;
  // const user = await User.findOne({ email });
  // if (!user) {
  //   throw HttpError(401, "User not found");
  // }

  res.status(200).json({
    user: {
      name,
      email,
      avatarURL,
      theme,
    },
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
    upload_preset: 'avatars',
  });
  const avatarURL = upload.secure_url;
  return res.json({
    success: true,
    avatarURL,
  });
};

const updateProfile = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findById(_id);
  let avatarURL = user.avatarURL;
  if (req.file) {
    if (avatarURL !== '') {
      const urlSliced = avatarURL.slice(62, avatarURL.length - 4);
      await cloudinary.uploader.destroy(urlSliced, { invalidate: true, resource_type: 'image' });
    }
    avatarURL = req.file.path;
  }
  const result = await User.findByIdAndUpdate(_id, { ...req.body, avatarURL, password: hashPassword }, { new: true });
  res.status(201).json(result);
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  avatarsCloud: controllerWrapper(avatarsCloud),
  updateProfile: controllerWrapper(updateProfile),
};
