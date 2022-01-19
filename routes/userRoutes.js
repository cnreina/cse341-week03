const express = require('express');
const APP_CWD = process.cwd();
const userController = require(APP_CWD + '/controllers/userController');
const router = express.Router();

// router.get('/user', userController.userView);
// router.get('/user/cart', userController.userCartView);
// router.get('/user/cart/edit-item/:itemuuid', userController.editCartItemView);

// router.post('/user/add-item', userController.addCartItemByUUID);
// router.post('/user/cart/update-item', userController.updateCartItemByUUID);
// router.post('/user/cart/remove-item', userController.removeCartItemByUUID);

module.exports = router;

