const express = require('express');
const columnsController = require('../../controllers/columnsController');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const schemas = require('../../schemas/columnSchema');

const router = express.Router();

router.use(authenticate);

router.get('/:id', isValidId, columnsController.getAllColumnsWithTasks);

router.post('/', validateBody(schemas.addSchema), columnsController.addColumn);

router.patch('/:id', isValidId, validateBody(schemas.editSchema), columnsController.editColumn);

router.delete('/:id', isValidId, columnsController.deleteColumn);

router.patch('/taskorder/:id', isValidId, validateBody(schemas.editTaskOrderSchema), columnsController.editTaskOrder);

module.exports = router;
