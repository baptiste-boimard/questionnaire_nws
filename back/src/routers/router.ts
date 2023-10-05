import loginController from '../controllers/loginController';
const express = require('express');

const router = express.Router();

router.post('/signup', loginController.signup);
router.post('/login', loginController.login);

module.exports = router;