const express = require('express');
const { signupController, signinController, getDataController } = require('../controller/authController');
const router = express.Router();

router.post('/signup', signupController);
router.post('/signin', signinController);
router.post('/getdata', getDataController);

module.exports = router;