const express = require('express');
const { authenticate } = require('../../middlewares');
const backgroundController = require('../../controllers/backgroundController');

const router = express.Router();

router.use(authenticate);

router.get('/', backgroundController.getBackgroundURL);

module.exports = router;
