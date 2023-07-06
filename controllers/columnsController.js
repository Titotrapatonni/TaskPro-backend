const Column = require('../models/column');
const Board = require('../models/board');
const { controllerWrapper } = require('../decorators');
const { HttpError } = require('../helpers');
const Task = require('../models/task');

const getAllColumnsWithTasks = async (req, res) => {
  const { id } = req.params;
  const boardData = await Column.aggregate([
    {
      $match: {
        parentBoard: id,
      },
    },
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'parentColumn',
        as: 'tasks',
      },
    },
  ]);

  res.json(boardData);
};

const addColumn = async (req, res) => {
  const { parentBoard } = req.body;
  const result = await Column.create({ ...req.body });
  await Board.findByIdAndUpdate(
    parentBoard,
    { $push: { columnOrder: result._id } },
    { safe: true, upsert: true, new: true }
  );

  res.status(201).json(result);
};

const editColumn = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const result = await Column.findByIdAndUpdate(id, { title }, { new: true });
  if (!result) {
    throw HttpError(404, 'Column not found');
  }

  res.status(201).json(result);
};

const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const column = await Column.findById(id);
  if (!column) {
    throw HttpError(404, 'Column not found');
  }
  await Board.findByIdAndUpdate(column.parentBoard, {
    $pull: { columnOrder: column._id },
  });
  const result = await Column.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Column not found');
  }
  const parentColumn = id;
  const chlidren = await Task.find({ parentColumn });
  if (chlidren.length > 0) {
    await Task.deleteMany({ parentColumn });
  }

  res.status(204).json({ message: `Column with id: ${id} deleted` });
};

const editTaskOrder = async (req, res) => {
  const { id } = req.params;
  const result = await Column.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Column with id: ${id} not found`);
  }

  res.status(201).json(result);
};

module.exports = {
  getAllColumnsWithTasks: controllerWrapper(getAllColumnsWithTasks),
  addColumn: controllerWrapper(addColumn),
  editColumn: controllerWrapper(editColumn),
  deleteColumn: controllerWrapper(deleteColumn),
  editTaskOrder: controllerWrapper(editTaskOrder),
};
