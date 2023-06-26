const express = require("express");
const columnsController = require("../../controllers/columnsController");
const { authenticate, validateBody } = require("../../middlewares");
const columnSchema = require("../../schemas/columnSchema");

const router = express.Router();

router.get(
  "/",
  authenticate,
  validateBody(columnSchema),
  columnsController.getAllColumns
);

router.post(
  "/",
  authenticate,
  validateBody(columnSchema),
  columnsController.addColumn
);

module.exports = router;
