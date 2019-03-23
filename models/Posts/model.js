
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'schools'
  },
  body: {
    type: String,
    required: true
  },
  imageurl: {
    type: String
  },
  postDate: {
    type: Date,
    required: true
  },
  editDate: {
    type: Date, 
  },
});

module.exports = mongoose.model('posts', Post);
