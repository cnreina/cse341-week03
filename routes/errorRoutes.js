const express = require('express');
const APP_CWD = process.cwd();
const errorController = require(APP_CWD + '/controllers/errorController');
const router = express.Router();

router.use('/', errorController.error404);

module.exports = router;
