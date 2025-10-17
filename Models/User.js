const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const medicalRecordSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  diagnosis: String,
  treatment: String,
  prescriptions: [String],
  reports: [String],
  notes: String
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, // login id
  fullName: { type: String, trim: true },
  email: { type: String },
  location: { type: String },
  profilePhoto: { url: String },
  coordinates: { lat: String, lng: String },
  createdAt: { type: Date, default: Date.now },
  medicalRecords: [medicalRecordSchema],
  // optional patient-specific fields
  age: Number,
  contact: String
});

// plugin passport-local-mongoose (adds authenticate, register, etc.)
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('User', userSchema);






































// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");



// const medicalRecordSchema = new mongoose.Schema({
//   date: { type: Date, default: Date.now },
//   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
//   diagnosis: String,
//   treatment: String,
//   prescriptions: [String],
//   reports: [String],
//   notes: String
// });

// const userSchema = new Schema({
//   fullName: {
//     type: String,
//     // required: true,
//     trim: true,
//   },

//   location: {
//     type: String,
//   },

//   profilePhoto:{
//     url:String
//   },


//   email: {
//     type: String,
//     unique: true,
//     required: true,
//   },

//   coordinates: { lat: String , lng: String },

//   //   username  ye sab passport local mongoose khud implement kar dega
//   //   password

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//   medicalRecords: [medicalRecordSchema] // embedded schema

// });


// userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model("User", userSchema);

// module.exports = User;
  