const express = require("express");
const boardsController = require("../../controllers/boardsController");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, boardsController.getAllBoards);

router.post("/", authenticate, boardsController.addBoard);

module.exports = router;
