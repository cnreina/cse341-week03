const express = require('express');
const APP_CWD = process.cwd();
const adminController = require(APP_CWD + '/controllers/adminController');
const router = express.Router();

/*	ADMIN HOME */
router.get('/admin', adminController.adminView);

/*	ADMIN ITEMS */
router.get('/admin/store', adminController.adminStoreView);
router.get('/admin/item-list', adminController.getAllItems);
router.get('/admin/item-list/:itemuuid', adminController.getItemByUUID);
router.post('/admin/filter-by-tag', adminController.filterItemsByTag);
router.get('/admin/add-item', adminController.addItemView);
router.post('/admin/save-newitem', adminController.saveNewItem);
router.get('/admin/edit-item/:itemuuid', adminController.editItemByUUID);
router.post('/admin/update-item', adminController.updateItemByUUID);
router.post('/admin/delete-item', adminController.deleteItemByUUID);

/*	ADMIN USERS */
router.get('/admin/user', adminController.adminUserView);
router.get('/admin/user-list', adminController.adminUsersView);
router.get('/admin/add-newuser', adminController.addUserView);
router.post('/admin/save-newuser', adminController.saveNewUser);
router.get('/admin/edit-user/:useruuid', adminController.editUserByUUID);
router.post('/admin/update-user', adminController.updateUserByUUID);
router.post('/admin/delete-user', adminController.deleteUserByUUID);

module.exports = router;
