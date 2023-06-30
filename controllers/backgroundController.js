const Background = require("../models/background");
const { controllerWrapper } = require("../decorators");

const getBackgroundURL = async (req, res) => {
  const result = await Background.find({});
  res.json(result);
};

module.exports = {
  getBackgroundURL: controllerWrapper(getBackgroundURL),
};
