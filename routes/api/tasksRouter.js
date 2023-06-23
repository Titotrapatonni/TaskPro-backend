const express = require("express");
const { authenticate } = require("../../middlewares");
const sendEmailController = require("../../controllers/sendEmailController");
const { validateBody } = require("../../middlewares");
const { sendEmailSchema } = require("../../schemas");

const router = express.Router();

router.use(authenticate);

router.post(
  "/help",
  validateBody(sendEmailSchema),
  sendEmailController.sendEmailMessage
);

module.exports = router;
