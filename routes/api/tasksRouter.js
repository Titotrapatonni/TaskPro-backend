const express = require('express');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const tasksController = require('../../controllers/tasksController');
const { emptyBodyError } = require('../../decorators');
const schemas = require('../../schemas/taskSchema');

const router = express.Router();

router.use(authenticate);

router.get('/:id', isValidId, tasksController.getAllTasks);
router.post('/', validateBody(schemas.addSchema), tasksController.addTask);
router.put('/:id', emptyBodyError, validateBody(schemas.editTaskSchema), tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
