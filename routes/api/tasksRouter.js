const express = require("express");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

router.get("/");

module.exports = router;
