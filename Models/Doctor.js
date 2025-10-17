const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const doctorSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, // login id
  fullName: String,
  specialization: String,
  experience: Number,
  serviceRange: Number, // meters
  location: String,
  profilePhoto: { url: String },
  coordinates: { lat: String, lng: String },
  email: { type: String, unique: true, required: true },
  pushSubscription: { type: Object },
phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

doctorSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('Doctor', doctorSchema);























// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

// const doctorSchema = new Schema({
//   fullName: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   location: {
//     type: String,
//   },
//   serviceRange :{   
//     type :Number
//   },
//    experience: {
//     type: Number,
//     default: 0 // years
//   },

//     specialization: {
//     type: String,
//     required: true
//   },

//   email: {
//     type: String,
//     unique: true,
//     required: true,
//   },

//   profilePhoto:{
//     type:String
//   },

//   coordinates: { lat: String, lng: String },

//   emerFee:{
//     type:Number,
//     default:100
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//   // Added availability toggle
//   isAvailable: {
//     type: Boolean,
//     default: true
//   }

// });
// // ...existing code...
// doctorSchema.plugin(passportLocalMongoose);

// const Doctor = mongoose.model("Doctor", doctorSchema);

// module.exports = Doctor;