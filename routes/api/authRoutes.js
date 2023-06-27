const express = require('express');
const authController = require('../../controllers/authControllers');
const themeController = require('../../controllers/themeController');
const { registerSchema, loginSchema, updateThemeSchema, updateProfileSchema } = require('../../schemas');
const { authenticate, validateBody, uploader } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(registerSchema), authController.register);

router.post('/login', validateBody(loginSchema), authController.login);

router.get('/current', authenticate, authController.getCurrent);

router.post('/logout', authenticate, authController.logout);

router.patch('/theme', authenticate, validateBody(updateThemeSchema), themeController.changeTheme);

router.patch(
  '/update',
  authenticate,
  uploader.single('avatar'),
  validateBody(updateProfileSchema),
  authController.updateProfile
);

router.post('/upload', authenticate, uploader.single('file'), authController.avatarsCloud);

module.exports = router;
