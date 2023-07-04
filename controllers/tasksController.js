const { controllerWrapper } = require('../decorators');
const Task = require('../models/task');
const Column = require('../models/column');

const { HttpError } = require('../helpers');

const getAllTasks = async (req, res) => {
  const { id: parentColumn } = req.params;

  const result = await Task.find({ parentColumn });
  //   .populate({
  //   path: 'column',
  //   ref: 'column',
  //   select: 'title',
  //   populate: {
  //     path: 'board',
  //     ref: 'board',
  //     select: 'currentBg title',
  //     populate: {
  //       path: 'owner',
  //       ref: 'owner',
  //       select: 'name email avatarURL theme',
  //     },
  //   },
  // });

  res.json(result);
};

const addTask = async (req, res) => {
  // ===-VR-===
  const { parentColumn } = req.body;
  // ===-VR-===

  const result = await Task.create({ ...req.body });

  // ===-VR-===
  await Column.findByIdAndUpdate(
    parentColumn,
    { $push: { taskOrder: result._id } },
    { safe: true, upsert: true, new: true }
  );
  // ===-VR-===
  res.status(201).json(result);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Task not found');
  }
  res.status(201).json(result);
};

const changeParentColumn = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Task with id: ${id} not found`);
  }
  res.status(201).json(result);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  // ===-VR-===
  const task = await Task.findById(id);

  if (!task) {
    throw HttpError(404, 'Task not found');
  }
  await Column.findByIdAndUpdate(task.parentColumn, {
    $pull: { taskOrder: task._id },
  });
  // ===-VR-===

  const result = await Task.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, 'Task not found');
  }
  res.status(204).json({ message: `Task with id: ${id} deleted` });
};

// ===-VR-===
const moveTask = async (req, res) => {
  const { id } = req.params;
  const { columnSourceOrder, columnDestinationOrder } = req.body;
  const destinitionColumnId = Object.keys(columnDestinationOrder)[0];
  const sourceColumnId = Object.keys(columnSourceOrder)[0];
  const destinationColumnArr = Object.values(columnDestinationOrder)[0];
  const sourceColumnArr = Object.values(columnSourceOrder)[0];

  await Column.findByIdAndUpdate(sourceColumnId, { taskOrder: sourceColumnArr });
  await Column.findByIdAndUpdate(destinitionColumnId, { taskOrder: destinationColumnArr });

  const task = await Task.findByIdAndUpdate(id, { parentColumn: destinitionColumnId }, { new: true });

  res.status(201).json(task);
};
// ===-VR-===

module.exports = {
  getAllTasks: controllerWrapper(getAllTasks),
  addTask: controllerWrapper(addTask),
  updateTask: controllerWrapper(updateTask),
  changeParentColumn: controllerWrapper(changeParentColumn),
  deleteTask: controllerWrapper(deleteTask),
  // ===-VR-===
  moveTask: controllerWrapper(moveTask),
  // ===-VR-===
};
