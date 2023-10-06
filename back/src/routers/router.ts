import loginController from '../controllers/loginController';
const express = require('express');

const router = express.Router();

router.post('/signup', loginController.signup);
router.post('/login', loginController.login);
router.post('/verify-email', loginController.verifyEmail);
router.post('/return-email-validation', loginController.returnToken);


module.exports = router;