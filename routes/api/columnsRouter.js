const express = require("express");
const columnsController = require("../../controllers/boardsController");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, columnsController.getAllColumns);

router.post("/", authenticate, columnsController.addColumn);

module.exports = router;
