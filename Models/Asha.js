const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const ashaSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, // login id
  fullName: String,
  phone: String,
  village: String,
  location: String,
  createdAt: { type: Date, default: Date.now }
});

ashaSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('Asha', ashaSchema);