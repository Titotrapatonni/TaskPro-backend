const express = require('express');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const tasksController = require('../../controllers/tasksController');
const schemas = require('../../schemas/taskSchema');

const router = express.Router();

router.use(authenticate);

router.get('/:id', isValidId, tasksController.getAllTasks);

router.post('/', validateBody(schemas.addSchema), tasksController.addTask);

router.put('/:id', validateBody(schemas.editTaskSchema), tasksController.updateTask);

router.patch('/:id/parentColumn', validateBody(schemas.changeParentColumnSchema), tasksController.changeParentColumn);

router.delete('/:id', tasksController.deleteTask);

router.patch('/movetask/:id', isValidId, validateBody(schemas.moveTaskSchema), tasksController.moveTask);

module.exports = router;
