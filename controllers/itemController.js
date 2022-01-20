// includes
const mongoose = require('mongoose');

// instantiate Item
const APP_CWD = process.cwd();
const Item    = require(APP_CWD + '/models/itemSchema');

let errorsArray   = [];
let itemTagsArray = [];

exports.getHome = (req, res, next) => {
  errorsArray.length = 0;
  Item.find().then(items => {
      res.render('homeViews/indexView', {
        items: items,
        pageTitle:          'Home',
        path:               '/store',
        errorsArray:        errorsArray,
        errorsArrayCount:   errorsArray.length,
        itemTagsArray:      itemTagsArray,
        itemTagsArrayCount: itemTagsArray.length,
        isAuthenticated:    req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
      errorsArray.push(err);
    });
};

/*	getAllItems
  Item.find()
  .select('title price -_id')
  .populate('userId', 'name')
*/
exports.getAllItems = (req, res, next) => {
  errorsArray.length = 0;
  Item.find().then(items => {
      res.render('storeViews/itemsView', {
        items: items,
        pageTitle:          'All items',
        path:               '/store/item-list',
        errorsArray:        errorsArray,
        errorsArrayCount:   errorsArray.length,
        itemTagsArray:      itemTagsArray,
        itemTagsArrayCount: itemTagsArray.length,
        isAuthenticated:    req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
      errorsArray.push(err);
    });
};

exports.getItemByUUID = (req, res, next) => {
  const itemUUID = req.params.itemuuid;
  Item.findOne({uuid: itemUUID}).then(item => {
      res.render('storeViews/itemDetailView', {
        item: item,
        pageTitle:          'Item',
        path:               '/store/item-list',
        errorsArray:        errorsArray,
        errorsArrayCount:   errorsArray.length,
        itemTagsArray:      itemTagsArray,
        itemTagsArrayCount: itemTagsArray.length,
        isAuthenticated:    req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
      errorsArray.push(err);
    });
};

exports.filterItemsByTag = (req, res, next) => {
  errorsArray.length = 0;
  itemTagsArray = req.body.itemTag;
  if (itemTagsArray[0] === '') {
    itemTagsArray.length = 0
  };
  res.redirect('/store/item-list');
};

