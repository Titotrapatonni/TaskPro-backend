const express = require('express');
const columnsController = require('../../controllers/columnsController');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const { columnSchema } = require('../../schemas');

const router = express.Router();

router.get('/', authenticate, validateBody(columnSchema.getAllSchema), columnsController.getAllColumns);

router.post('/', authenticate, validateBody(columnSchema.addSchema), columnsController.addColumn);

router.patch('/:id', authenticate, isValidId, validateBody(columnSchema.editSchema), columnsController.editColumn);

router.delete('/:id', authenticate, isValidId, columnsController.deleteColumn);
module.exports = router;
