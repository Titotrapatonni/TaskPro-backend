const express = require("express");
const columnsController = require("../../controllers/columnsController");
const { authenticate, validateBody, isValidId } = require("../../middlewares");
const { columnSchema } = require("../../schemas");

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  validateBody(columnSchema.getAllSchema),
  columnsController.getAllColumns
);

router.post(
  "/",
  validateBody(columnSchema.addSchema),
  columnsController.addColumn
);

router.patch(
  "/:id",
  isValidId,
  validateBody(columnSchema.editSchema),
  columnsController.editColumn
);

router.delete("/:id", isValidId, columnsController.deleteColumn);

module.exports = router;
