const { controllerWrapper } = require('../decorators');
const Column = require('../models/column');
const Task = require('../models/task');

const {HttpError} = require("../helpers");

const getAllTasks = async (req, res) => {
  // console.log('getAllTasks');
  const { parentColumn } = req.body;

  const result = await Task.find({ parentColumn }).populate({
    path: 'column',
    ref: 'column',
    select: 'title',
    populate: {
      path: 'board',
      ref: 'board',
      select: 'currentBg title',
      populate: {
        path: 'owner',
        ref: 'owner',
        select: 'name email avatarURL theme',
      },
    },
  });

  res.json(result);
};

const addTask = async (req, res) => {
  // console.log('addTask');
  const { parentColumn } = req.body;

  const column = await Column.findById(parentColumn);
  const result = await Task.create({ ...req.body, column });

  res.status(201).json(result);
};

const updateTask = async (req, res) => {
  const{id} = req.params;
  const {title, description, priority, deadline} = req.body;
  const result = await Task.findByIdAndUpdate(id, {title, description,priority,deadline}, {new: true});
 if (!result){
  throw HttpError(404, 'Task not found')
 }
 res.status(201).json(result);
}

const deleteTask = async (req, res) => {
  const{id} = req.params;

  const result = await Task.findByIdAndDelete(id)
  if (!result){
    throw HttpError(404, 'Task not found')
   }
   res.status(201).json({message: "task deleted"});
}

module.exports = {
  getAllTasks: controllerWrapper(getAllTasks),
  addTask: controllerWrapper(addTask),
  updateTask: controllerWrapper(updateTask),
  deleteTask: controllerWrapper(deleteTask),
};
