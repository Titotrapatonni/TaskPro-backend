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
router.patch(
  '/:id/parentColumn',
  emptyBodyError,
  validateBody(schemas.changeParentColumnSchema),
  tasksController.changeParentColumn
);
router.delete('/:id', tasksController.deleteTask);
// ===-VR-===
router.patch('/movetask/:id', authenticate, isValidId, validateBody(schemas.moveTaskSchema), tasksController.moveTask);
// ===-VR-===

module.exports = router;
