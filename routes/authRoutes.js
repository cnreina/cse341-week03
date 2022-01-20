const express = require('express');
const APP_CWD = process.cwd();
const authController = require(APP_CWD + '/controllers/authController');
const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

module.exports = router;