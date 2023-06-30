const express = require('express');
const { authenticate, validateBody } = require('../../middlewares');
const tasksController = require('../../controllers/tasksController');
const { emptyBodyError } = require('../../decorators');
const { taskSchema } = require('../../schemas');

const router = express.Router();

router.use(authenticate);

router.get('/', validateBody(taskSchema.getAllSchema), tasksController.getAllTasks);
router.post('/', validateBody(taskSchema.addSchema), tasksController.addTask);
router.put('/:id', emptyBodyError, validateBody(taskSchema.editTaskSchema), tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
