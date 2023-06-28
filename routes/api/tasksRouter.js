const express = require('express');
const { authenticate, validateBody } = require('../../middlewares');
const tasksController = require('../../controllers/tasksController');
const schemas = require('../../schemas/taskSchema');

const router = express.Router();

router.use(authenticate);

router.get('/', validateBody(schemas.getAllSchema), tasksController.getAllTasks);
router.post('/', validateBody(schemas.addSchema), tasksController.addTask);

module.exports = router;
