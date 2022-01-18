const express = require('express');
const APP_CWD = process.cwd();
const adminController = require(APP_CWD + '/controllers/adminController');
const router = express.Router();

router.get('/admin', adminController.adminView);
router.post('/admin/add-item', adminController.addItem);
router.get('/admin/edit-item/:itemuuid', adminController.editItemByUUID);
router.post('/admin/update-item', adminController.updateItem);
router.post('/admin/delete-item/:itemuuid', adminController.deleteItemByUUID);

module.exports = router;
