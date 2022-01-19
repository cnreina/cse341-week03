/*	INCLUDES */
const APP_CWD           = process.cwd();
const Item              = require(APP_CWD + '/models/itemSchema');
const User              = require(APP_CWD + '/models/userSchema');
const cryptoController  = require(APP_CWD + '/controllers/cryptoController');

let errorsArray   = [];
let itemTagsArray = [];

/*	ADMIN HOME */

exports.adminView = (req, res, next) => {
  errorsArray.length = 0;
  Item.find().then(items => {
      res.render('adminViews/adminView', {
        items:              items,
        pageTitle:          'Admin View',
        path:               '/admin',
        errorsArray:        errorsArray,
        errorsArrayCount:   errorsArray.length,
        itemTagsArray:      itemTagsArray,
        itemTagsArrayCount: itemTagsArray.length
      });
    })
    .catch(err => {
      console.log('adminView: ', err);
      errorsArray.push(err);
    });
};

/*	ADMIN ITEMS */

exports.adminStoreView = (req, res, next) => {
  errorsArray.length = 0;
  res.render('adminViews/adminStoreView', {
    pageTitle:          'Store Admin',
    path:               '/admin/store',
    errorsArray:        errorsArray,
    errorsArrayCount:   errorsArray.length
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
      res.render('adminViews/adminItemsView', {
        items: items,
        pageTitle: 'All items',
        path: '/admin/item-list',
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

exports.getItemByUUID = (req, res, next) => {
  const itemUUID = req.params.itemuuid;
  Item.findOne({uuid: itemUUID}).then(item => {
      res.render('adminViews/adminItemDetailView', {
        item: item,
        pageTitle: 'Item',
        path: '/admin/item-list',
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
  res.redirect('/admin/item-list');
};

exports.addItemView = (req, res, next) => {
  errorsArray.length = 0;
  res.render('adminViews/adminAddItemView', {
    pageTitle:          'New Item',
    path:               '/admin/add-item',
    errorsArray:        errorsArray,
    errorsArrayCount:   errorsArray.length
  });
};

exports.saveNewItem = (req, res, next) => {
  errorsArray.length  = 0;
  const newtags          = req.body.tags;
  const newimageUrl      = req.body.imageUrl;
  const newprice         = req.body.price;
  const newname          = req.body.name;
  const newdescription   = req.body.description;
  const newuuid          = cryptoController.getNewUUID();

  const item = new Item({
    tags:         newtags,
    imageUrl:     newimageUrl,
    price:        newprice,
    name:         newname,
    description:  newdescription,
    uuid:         newuuid
  });
  item.save().then(result => {
      console.log('addItem: ', result);
      res.redirect('/admin/item-list/' + newuuid);
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
      res.render('adminViews/adminEditItemView', {
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

exports.updateItemByUUID = (req, res, next) => {
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
      res.redirect('/admin/edit-item/' + itemUUID);
    })
    .catch(err => {
      console.log('updateItem: ', err);
      errorsArray.push(err);
    });
};

exports.deleteItemByUUID = (req, res, next) => {
  errorsArray.length = 0;
  const itemUUID = req.body.itemuuid;
  Item.findOneAndDelete({uuid: itemUUID}).then(() => {
    console.log('deleteItem: ', itemUUID);
    res.redirect('/admin/item-list');
  })
  .catch(err => {
    console.log('deleteItem: ', err);
    errorsArray.push(err);
  });
};

/*	ADMIN USERS 
    users can create their account as a user account.
    admins can create admin accounts and edit-delete user accounts.
*/

exports.adminUserView = (req, res, next) => {
  errorsArray.length = 0;
  res.render('adminViews/adminUserView', {
    pageTitle:          'Store Admin',
    path:               '/admin/user',
    errorsArray:        errorsArray,
    errorsArrayCount:   errorsArray.length
  });
};

exports.adminUsersView = (req, res, next) => {
  errorsArray.length = 0;
  User.find().then(users => {
      res.render('adminViews/adminUsersView', {
        users:              users,
        pageTitle:          'Users',
        path:               '/admin/user-list',
        errorsArray:        errorsArray,
        errorsArrayCount:   errorsArray.length
      });
    })
    .catch(err => {
      console.log('adminUsersView: ', err);
      errorsArray.push(err);
    });
};

exports.addUserView = (req, res, next) => {
  errorsArray.length = 0;
  res.render('adminViews/adminAddUserView', {
    pageTitle:          'Add User',
    path:               '/admin/add-newuser',
    errorsArray:        errorsArray,
    errorsArrayCount:   errorsArray.length
  });
};

exports.saveNewUser = (req, res, next) => {
  errorsArray.length = 0;
  const newname =   req.body.name;
  const newemail =  req.body.email;
  const newrole =   req.body.role;
  const newcart =   req.body.cart;
  const newuuid =   cryptoController.getNewUUID();

  const user = new User({
    name:   newname,
    email:  newemail,
    role:   newrole,
    cart:   newcart,
    uuid:   newuuid
  });
  user.save().then(result => {
      console.log('saveNewUser: ', result);
      res.redirect('/admin/user-list');
    })
    .catch(err => {
      console.log('saveNewUser: ', err);
      errorsArray.push(err);
    });
};

exports.editUserByUUID = (req, res, next) => {
  errorsArray.length = 0;
  const userUUID = req.params.useruuid;
  Item.findOne({uuid: userUUID}).then(user => {
      res.render('adminViews/adminEditUserView', {
        pageTitle: 'Edit User',
        path: '/admin/edit-user',
        user: user,
        errorsArray: errorsArray,
        errorsArrayCount: errorsArray.length
      });
    })
    .catch(err => {
      console.log('editUserByUUID: ', err);
      errorsArray.push(err);
    });
};

exports.updateUserByUUID = (req, res, next) => {
  errorsArray.length = 0;
  const newname =   req.body.name;
  const newemail =  req.body.email;
  const newrole =   req.body.role;
  const newcart =   req.body.cart;

  const userUUID = req.body.useruuid;
  Item.findOne({uuid: userUUID}).then(user => {
      user.name =   newname;
      user.email =  newemail;
      user.role =   newrole;
      user.cart =   newcart;
      return user.save();
    })
    .then(result => {
      console.log('updateUserByUUID: ', result);
      res.redirect('/admin/edit-user/' + itemUUID);
    })
    .catch(err => {
      console.log('updateUserByUUID: ', err);
      errorsArray.push(err);
    });
};

exports.deleteUserByUUID = (req, res, next) => {
  errorsArray.length = 0;
  const userUUID = req.body.useruuid;
  User.findOneAndDelete({uuid: userUUID}).then(() => {
    console.log('deleteUserByUUID: ', userUUID);
    res.redirect('/admin/user-list');
  })
  .catch(err => {
    console.log('deleteUserByUUID: ', err);
    errorsArray.push(err);
  });
};

