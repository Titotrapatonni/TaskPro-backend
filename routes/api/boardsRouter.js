const express = require('express');
const boardsController = require('../../controllers/boardsController');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const { boardSchemas } = require('../../schemas');

const router = express.Router();

router.use(authenticate);

router.get('/', boardsController.getAllBoards);

router.post('/', validateBody(boardSchemas.addBoardSchema), boardsController.addBoard);

router.put('/:id', isValidId, validateBody(boardSchemas.editBoardSchema), boardsController.editBoard);

router.patch('/:id/currentBg', isValidId, validateBody(boardSchemas.editBackgroundSchema), boardsController.editBoard);

router.delete('/:id', isValidId, boardsController.deleteBoard);

router.patch(
  '/columnorder/:id',
  isValidId,
  validateBody(boardSchemas.editColumnOrderSchema),
  boardsController.editColumnOrder
);

module.exports = router;
