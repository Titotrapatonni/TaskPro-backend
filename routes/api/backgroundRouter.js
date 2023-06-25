const express = require("express");
const { authenticate } = require("../../middlewares");
const getBgController = require("../../controllers/getBgController");

const router = express.Router();

router.use(authenticate);

router.get("/", getBgController.getBackgroundURL);

module.exports = router;
