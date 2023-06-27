const express = require('express');
const { authenticate } = require('../../middlewares');
const tasksController = require('../../controllers/tasksController');

const router = express.Router();

router.use(authenticate);

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.addTask);

module.exports = router;
