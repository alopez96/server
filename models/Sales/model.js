
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sale = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  schoolid: {
    type: Schema.Types.ObjectId,
    ref: 'schools'
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  image: {
    type: String
  },
  postDate: {
    type: String
  },
  lastEditDate: {
    tpye: String
  },
  sold: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('sales', Sale);
