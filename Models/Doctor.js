const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const doctorSchema = new Schema({
  fullName: {
    type: String,
    // required: true,
    trim: true,
  },
  location: {
    type: String,
  },
  serviceRange :{   
    type :Number
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  profilePhoto:{
    type:String
  },

  coordinates: { lat: String, lng: String },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

doctorSchema.plugin(passportLocalMongoose);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
