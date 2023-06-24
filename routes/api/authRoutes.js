const express = require("express");
const authController = require("../../controllers/authControllers");
const themeController = require("../../controllers/themeController");
const {
  registerSchema,
  loginSchema,
  updateThemeSchema,
} = require("../../schemas");
const { authenticate, validateBody } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(registerSchema), authController.register);

router.post("/login", validateBody(loginSchema), authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
  "/theme",
  authenticate,
  validateBody(updateThemeSchema),
  themeController.changeTheme
);

module.exports = router;
