const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
  fullName: {
    type: String,
    // required: true,
    trim: true,
  },

  location: {
    type: String,
  },

  profilePhoto:{
    url:String
  },


  email: {
    type: String,
    unique: true,
    required: true,
  },

  coordinates: { lat: String , lng: String },

  //   username  ye sab passport local mongoose khud implement kar dega
  //   password

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
