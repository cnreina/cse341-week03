const express = require('express');
const APP_CWD = process.cwd();
const userController = require(APP_CWD + '/controllers/userController');
const router = express.Router();

router.get('/user', userController.userView);
router.post('/user/add-cartitem', userController.addCartItemByUUID);
router.get('/user/edit-cartitem/:itemuuid', userController.editCartItemByUUID);
router.post('/user/update-cartitem', userController.updateCartItemByUUID);
router.post('/user/remove-cartitem', userController.removeCartItemByUUID);

module.exports = router;
