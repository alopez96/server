
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  user: {
    type: String,
    required: true,
  },
  category: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  imageurl: {
    type: String
  },
  postDate: {
    type: Date
  }
});

module.exports = mongoose.model('posts', Post);
