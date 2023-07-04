const express = require('express');
const boardsController = require('../../controllers/boardsController');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const { boardSchemas } = require('../../schemas');

const router = express.Router();

router.get('/', authenticate, boardsController.getAllBoards);

router.post('/', authenticate, validateBody(boardSchemas.addBoardSchema), boardsController.addBoard);

router.put('/:id', authenticate, isValidId, validateBody(boardSchemas.editBoardSchema), boardsController.editBoard);

router.patch(
  '/:id/currentBg',
  authenticate,
  isValidId,
  validateBody(boardSchemas.editBackgroundSchema),
  boardsController.editBoard
);

router.delete('/:id', authenticate, isValidId, boardsController.deleteBoard);

// ===-VR-===

router.patch(
  '/columnorder/:id',
  authenticate,
  isValidId,
  validateBody(boardSchemas.editColumnOrderSchema),
  boardsController.editColumnOrder
);

// ===-VR-===

module.exports = router;
