
// instantiate Item
const APP_CWD = process.cwd();
const Item = require(APP_CWD + '/models/itemSchema');

let errorsArray = []
let itemTagsArray = []

exports.getHome = (req, res, next) => {
  errorsArray.length = 0;
  Item.find()
    .then(items => {
      res.render('home/indexView', {
        items: items,
        pageTitle: 'Home',
        path: '/',
        errorsArray: errorsArray,
        errorsArrayCount : errorsArray.length,
        itemTagsArray: itemTagsArray,
        itemTagsArrayCount : itemTagsArray.length
      });
    })
    .catch(err => {
      console.log(err);
      errorsArray.push(err);
    });
};

exports.getAllItems = (req, res, next) => {
  errorsArray.length = 0;
  Item.find()
    .then(items => {
      res.render('home/itemsView', {
        items: items,
        pageTitle: 'All items',
        path: '/item-list',
        errorsArray : errorsArray,
        errorsArrayCount : errorsArray.length,
        itemTagsArray: itemTagsArray,
        itemTagsArrayCount : itemTagsArray.length
      });
    })
    .catch(err => {
      console.log(err);
      errorsArray.push(err);
    });
};

exports.getItemByUUID = (req, res, next) => {
  const itemUUID = req.params.itemuuid;
  Item.findOne({uuid: itemUUID})
    .then(item => {
      res.render('home/itemDetailView', {
        item: item,
        pageTitle: 'Item',
        path: '/item-list',
        errorsArray: errorsArray,
        errorsArrayCount: errorsArray.length,
        itemTagsArray: itemTagsArray,
        itemTagsArrayCount: itemTagsArray.length
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
  res.redirect('/item-list');
};

exports.insertUUIDtoAllItems = () => {
  errorsArray.length = 0;
  const cryptoController = require(APP_CWD + '/controllers/cryptoController');
  Item.find().then(items => {
    items.forEach(item => {
      item.uuid = cryptoController.getNewUUID();
      item.save();
    });
  });
  return 'Called: insertUUIDtoAllItems';
};
