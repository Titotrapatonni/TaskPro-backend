const express = require('express');
const boardsController = require('../../controllers/boardsController');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const { boardSchema } = require('../../schemas');

const router = express.Router();

router.get('/', authenticate, boardsController.getAllBoards);

router.post('/', authenticate, validateBody(boardSchema), boardsController.addBoard);

router.put('/:id', authenticate, isValidId, validateBody(boardSchema), boardsController.editBoard);

router.delete('/:id', authenticate, isValidId, boardsController.deleteBoard);

module.exports = router;
