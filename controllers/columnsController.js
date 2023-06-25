const Column = require("../models/column");
const { controllerWrapper } = require("../decorators");

const getAllColumns = async (req, res) => {
  const { _id: owner } = req.user;
  // const {owner} =
  const result = await Column.find({ owner }).populate("boards.user").exec();

  res.json(result);
};
const addColumn = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Column.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  getAllColumns: controllerWrapper(getAllColumns),
  addColumn: controllerWrapper(addColumn),
};
