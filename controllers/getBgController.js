const Background = require("../models/bgModel");
const { controllerWrapper } = require("../decorators");

const getURL = async (req, res) => {
  const result = await Background.find({});
  res.json(result);
};

module.exports = {
  getURL: controllerWrapper(getURL),
};
