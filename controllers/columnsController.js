const Column = require("../models/column");
const { controllerWrapper } = require("../decorators");
const Board = require("../models/board");

const getAllColumns = async (req, res) => {
  const { _id: owner } = req.user;
  const board = await Board.find({ owner });

  const result = await Column.find({ board }).populate({
    path: "board",
    model: "board",
    select: "currentBg title",
    populate: {
      path: "owner",
      ref: "owner",
      select: "name email avatarURL theme",
    },
  });

  res.json(result);
};
const addColumn = async (req, res) => {
  const { _id: owner } = req.user;
  const board = await Board.find({ owner });

  const result = await Column.create({ ...req.body, board });
  res.status(201).json(result);
};

module.exports = {
  getAllColumns: controllerWrapper(getAllColumns),
  addColumn: controllerWrapper(addColumn),
};
