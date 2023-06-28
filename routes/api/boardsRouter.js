const express = require('express');
const boardsController = require('../../controllers/boardsController');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const { boardSchemas } = require('../../schemas');

const router = express.Router();

router.get('/', authenticate, boardsController.getAllBoards);

router.post('/', authenticate, validateBody(boardSchemas.addBoardSchema), boardsController.addBoard);

router.put('/:id', authenticate, isValidId, validateBody(boardSchemas.editBoardSchema), boardsController.editBoard);

router.delete('/:id', authenticate, isValidId, boardsController.deleteBoard);

module.exports = router;
