const User = require("../models/user");
const { controllerWrapper } = require("../decorators");

const changeTheme = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.status(200).json({
    user: {
      theme: result.theme,
    },
  });
};

module.exports = {
  changeTheme: controllerWrapper(changeTheme),
};
