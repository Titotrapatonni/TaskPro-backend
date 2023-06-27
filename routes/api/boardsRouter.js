const express = require('express');
const boardsController = require('../../controllers/boardsController');
const { authenticate, validateBody } = require('../../middlewares');
const boardSchema = require('../../schemas/boardSchema');

const router = express.Router();

router.get('/', authenticate, boardsController.getAllBoards);

router.post('/', authenticate, validateBody(boardSchema), boardsController.addBoard);

module.exports = router;
