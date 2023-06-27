const { controllerWrapper } = require("../decorators");

const getAllTasks = async (req, res) => {
  console.log("getAllTasks");
};

const addTask = async (req, res) => {
  console.log("addTask");
};

module.exports = {
  getAllTasks: controllerWrapper(getAllTasks),
  addTask: controllerWrapper(addTask),
};
