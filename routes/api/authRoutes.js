const express = require("express");
const authController = require("../../controllers/authControllers");
const { registerSchema, loginSchema } = require("../../schemas");
const { authenticate, validateBody, uploader } = require("../../middlewares");

const router = express.Router();

//! signUp routes
router.post("/register", validateBody(registerSchema), authController.register);

//! signIn routes
router.post("/login", validateBody(loginSchema), authController.login);

//! get current user routes
router.get("/current", authenticate, authController.getCurrent);

//! logOut routes
router.post("/logout", authenticate, authController.logout);


router.post("/upload", authenticate, uploader.single("file"), authController.avatarsCloud);

module.exports = router;
