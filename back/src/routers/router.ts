import loginController from '../controllers/loginController';
import signupController from '../controllers/signupController';
const express = require('express');

const router = express.Router();

router.post('/signup', signupController.signup);
router.post('/login', loginController.login);
router.post('/return-email-validation', signupController.returnToken);


module.exports = router;