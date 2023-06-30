const Column = require("../models/column");
const { controllerWrapper } = require("../decorators");
const Board = require("../models/board");
const { HttpError } = require("../helpers");
const Task = require("../models/task");

const getAllColumns = async (req, res) => {
  const { parentBoard } = req.body;

  const result = await Column.find({ parentBoard }).populate({
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
  const { parentBoard } = req.body;

  const board = await Board.findById(parentBoard);
  const result = await Column.create({ ...req.body, board });

  res.status(201).json(result);
};

const editColumn = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const result = await Column.findByIdAndUpdate(id, { title }, { new: true });
  if (!result) {
    throw HttpError(404, "Column not found");
  }

  res.status(201).json(result);
};

const deleteColumn = async (req, res) => {
  const { id } = req.params;

  const result = await Column.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Column not found");
  }

  const parentColumn = id;
  const childrens = await Task.find({ parentColumn });
  if (childrens.length > 0) {
    await Task.deleteMany({ parentColumn });
  }

  res.status(204).json({ message: `Column with id: ${id} deleted` });
};

module.exports = {
  getAllColumns: controllerWrapper(getAllColumns),
  addColumn: controllerWrapper(addColumn),
  editColumn: controllerWrapper(editColumn),
  deleteColumn: controllerWrapper(deleteColumn),
};
