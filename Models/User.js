const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },

//   username  ye sab passport local mongoose khud implement kar dega 
//   password: {
//     type: String,
//     required: true
//   },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
// User.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;