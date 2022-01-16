const express = require('express');
const APP_CWD = process.cwd();
const itemController = require(APP_CWD + '/controllers/itemController');
const router = express.Router();

router.get('/', itemController.getIndex);
router.get('/item-list', itemController.getAllItems);
router.post('/filter-by-tag', itemController.filterItemsByTag);

module.exports = router;
