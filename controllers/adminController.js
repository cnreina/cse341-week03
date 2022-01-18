// instantiate Item
const APP_CWD = process.cwd();
const Item = require(APP_CWD + '/models/itemSchema');

let errorsArray = []
let itemTagsArray = []

exports.adminView = (req, res, next) => {
  errorsArray.length = 0;
  Item.find().then(items => {
      res.render('home/adminView', {
        items: items,
        pageTitle: 'Admin View',
        path: '/admin',
        errorsArray: errorsArray,
        errorsArrayCount: errorsArray.length,
        itemTagsArray: itemTagsArray,
        itemTagsArrayCount: itemTagsArray.length
      });
    })
    .catch(err => {
      console.log('adminView: ', err);
      errorsArray.push(err);
    });
};

const cryptoController = require(APP_CWD + '/controllers/cryptoController');
exports.addItem = (req, res, next) => {
  errorsArray.length = 0;
  const tags = req.body.tags;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const name = req.body.name;
  const description = req.body.description;
  const uuid = cryptoController.getNewUUID();

  const item = new Item({
    tags: tags,
    imageUrl: imageUrl,
    price: price,
    name: name,
    description: description,
    uuid: uuid
  });
  item.save().then(result => {
      console.log('postAddItem: ', result);
      res.redirect('/admin/items');
    })
    .catch(err => {
      console.log('addItem: ', err);
      errorsArray.push(err);
    });
};

exports.editItemByUUID = (req, res, next) => {
  errorsArray.length = 0;
  const itemUUID = req.params.itemuuid;
  Item.findOne({uuid: itemUUID}).then(item => {
      if (!item) {
        return res.redirect('/admin');
      }
      res.render('home/adminEditItemView', {
        pageTitle: 'Edit Item',
        path: '/admin/edit-item',
        item: item,
        errorsArray: errorsArray,
        errorsArrayCount: errorsArray.length,
        itemTagsArray: itemTagsArray,
        itemTagsArrayCount: itemTagsArray.length
      });
    })
    .catch(err => {
      console.log('editItemByUUID: ', err);
      errorsArray.push(err);
    });
};

exports.updateItem = (req, res, next) => {
  errorsArray.length = 0;
  const newtags = req.body.tags;
  const newimageUrl = req.body.imageUrl;
  const newprice = req.body.price;
  const newname = req.body.name;
  const newdescription = req.body.description;

  const itemUUID = req.body.itemuuid;
  Item.findOne({uuid: itemUUID}).then(item => {
      item.tags = newtags;
      item.imageUrl = newimageUrl;
      item.price = newprice;
      item.name = newname;
      item.description = newdescription;
      return item.save();
    })
    .then(result => {
      console.log('updateItem: ', result);
      res.redirect('/admin/edit-item/' + itemUUID);
    })
    .catch(err => {
      console.log('updateItem: ', err);
      errorsArray.push(err);
    });
};

exports.deleteItemByUUID = (req, res, next) => {
  errorsArray.length = 0;
  const itemUUID = req.params.itemuuid;
  Item.findOneAndDelete({uuid: itemUUID}).then(() => {
    console.log('deleteItem: ', itemUUID);
    res.redirect('/admin/items');
  })
  .catch(err => {
    console.log('deleteItem: ', err);
    errorsArray.push(err);
  });
};
