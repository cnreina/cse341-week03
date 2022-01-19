/*	CLASS User */

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userSchema = new Schema({
  status: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        itemuuid: {
          type: String,
          ref: 'Item',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  uuid: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('User', userSchema);
