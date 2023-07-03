const { HttpError } = require('../helpers');
const { controllerWrapper } = require('../decorators');
const Board = require('../models/board');
const Column = require('../models/column');
const Task = require('../models/task');

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.find({ owner }).populate('owner', '_id name email avatarURL theme');

  res.json(result);
};

const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.create({ ...req.body, owner });

  res.status(201).json(result);
};

const editBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Board with id: ${id} not found`);
  }
  res.status(201).json(result);
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Board with id: ${id} not found`);
  }

  const parentBoard = id;
  const children = await Column.find({ parentBoard });
  if (children.length > 0) {
    children.forEach(async column => await Task.deleteMany({ parentColumn: column._id }));
    await Column.deleteMany({ parentBoard });
  }

  res.status(204).json({ message: `Board with id: ${id} deleted` });
};

// ===-VR-===
const editColumnOrder = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Board with id: ${id} not found`);
  }
  res.status(201).json(result);
};
// ===-VR-===

module.exports = {
  getAllBoards: controllerWrapper(getAllBoards),
  addBoard: controllerWrapper(addBoard),
  deleteBoard: controllerWrapper(deleteBoard),
  editBoard: controllerWrapper(editBoard),
  // ===-VR-===
  editColumnOrder: controllerWrapper(editColumnOrder),
  // ===-VR-===
};
