import routerWrapper from '../handlers/routerWrapper';
import loginController from '../controllers/loginController';
import signupController from '../controllers/signupController';
const express = require('express');

const router = express.Router();

router.post('/signup', routerWrapper(signupController.signup));
router.post('/login', routerWrapper(loginController.login));
router.post('/return-email-validation', routerWrapper(signupController.returnToken));


module.exports = router;