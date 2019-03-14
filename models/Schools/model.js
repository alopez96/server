
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const School = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  logourl: {
    type: String
  }
});

module.exports = mongoose.model('schools', School);
