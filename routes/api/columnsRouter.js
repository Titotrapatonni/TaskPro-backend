const express = require('express');
const columnsController = require('../../controllers/columnsController');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const schemas = require('../../schemas/columnSchema');

const router = express.Router();

router.get('/:id', authenticate, isValidId, columnsController.getAllColumnsWithTasks);

router.post('/', authenticate, validateBody(schemas.addSchema), columnsController.addColumn);

router.patch('/:id', authenticate, isValidId, validateBody(schemas.editSchema), columnsController.editColumn);

router.delete('/:id', authenticate, isValidId, columnsController.deleteColumn);
module.exports = router;
