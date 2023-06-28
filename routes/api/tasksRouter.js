const express = require('express');
const { authenticate, validateBody } = require('../../middlewares');
const tasksController = require('../../controllers/tasksController');
const {emptyBodyError} =require('../../decorators');
const schemas = require('../../schemas/taskSchema');

const router = express.Router();

router.use(authenticate);

router.get('/', validateBody(schemas.getAllSchema), tasksController.getAllTasks);
router.post('/', validateBody(schemas.addSchema), tasksController.addTask);
router.put('/:id', emptyBodyError, validateBody(schemas.taskSchema), tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
