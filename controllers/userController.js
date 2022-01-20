/*	INCLUDES */

const APP_CWD = process.cwd();
const User    = require(APP_CWD + '/models/userSchema');

let errorsArray = [];

/*	USER HOME */
exports.userView = (req, res, next) => {
  errorsArray.length = 0;
  Item.find().then(users => {
      res.render('userViews/userView', {
        users:            users,
        pageTitle:        'User View',
        path:             '/user',
        errorsArray:      errorsArray,
        errorsArrayCount: errorsArray.length,
        isAuthenticated:  req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log('userView: ', err);
      errorsArray.push(err);
    });
};

/*	USER CART */

exports.addCartItemByUUID = (req, res, next) => {
  errorsArray.length  = 0;
  const tags          = req.body.tags;
  const imageUrl      = req.body.imageUrl;
  const price         = req.body.price;
  const name          = req.body.name;
  const description   = req.body.description;
  const uuid          = cryptoController.getNewUUID();

  const item = new Item({
    tags:         tags,
    imageUrl:     imageUrl,
    price:        price,
    name:         name,
    description:  description,
    uuid:         uuid
  });
  item.save().then(result => {
      console.log('postAddItem: ', result);
      res.redirect('/user/items');
    })
    .catch(err => {
      console.log('addItem: ', err);
      errorsArray.push(err);
    });
};

exports.editCartItemByUUID = (req, res, next) => {
  errorsArray.length = 0;
  const itemUUID = req.params.itemuuid;
  Item.findOne({uuid: itemUUID}).then(item => {
      if (!item) {
        return res.redirect('/user');
      }
      res.render('userViews/adminEditItemView', {
        pageTitle:          'Edit Item',
        path:               '/admin/edit-item',
        item:               item,
        errorsArray:        errorsArray,
        errorsArrayCount:   errorsArray.length,
        itemTagsArray:      itemTagsArray,
        itemTagsArrayCount: itemTagsArray.length
      });
    })
    .catch(err => {
      console.log('editItemByUUID: ', err);
      errorsArray.push(err);
    });
};

exports.updateCartItemByUUID = (req, res, next) => {
  errorsArray.length = 0;
  const newtags =         req.body.tags;
  const newimageUrl =     req.body.imageUrl;
  const newprice =        req.body.price;
  const newname =         req.body.name;
  const newdescription =  req.body.description;

  const itemUUID = req.body.itemuuid;
  Item.findOne({uuid: itemUUID}).then(item => {
      item.tags =         newtags;
      item.imageUrl =     newimageUrl;
      item.price =        newprice;
      item.name =         newname;
      item.description =  newdescription;
      return item.save();
    })
    .then(() => {
      res.redirect('/userViews/edit-item/' + itemUUID);
    })
    .catch(err => {
      console.log('updateItem: ', err);
      errorsArray.push(err);
    });
};

exports.removeCartItemByUUID = (req, res, next) => {
  errorsArray.length = 0;
  const itemUUID = req.params.itemuuid;
  Item.findOneAndDelete({uuid: itemUUID}).then(() => {
    console.log('deleteItem: ', itemUUID);
    res.redirect('/user/items');
  })
  .catch(err => {
    console.log('deleteItem: ', err);
    errorsArray.push(err);
  });
};
