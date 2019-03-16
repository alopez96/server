
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  joined: {
    type: Date
  },
  safe:{
    type: Schema.Types.ObjectId,
    ref: 'sales'
  }
});

module.exports = mongoose.model('users', User);
