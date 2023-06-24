const express = require("express");
// const authController = require("../../controllers/authControllers");
// const { authenticate, validateBody } = require("../../middlewares");
const boardsController = require("../../controllers/boardsController");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, boardsController.getAllBoards);

router.post("/", authenticate, boardsController.addBoard);

module.exports = router;
