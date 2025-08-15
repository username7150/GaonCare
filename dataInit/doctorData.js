const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const mongoose = require("mongoose");
const Doctor = require("../Models/Doctor.js");



const Doctors = [
  {
    username: "aditi.sharma",
    password: "Pass@123",
    fullName: "Dr. Aditi Sharma",
    location: "Chilkahar, Ballia",
    serviceRange: 5000,
    experience: 8,
    specialization: "Gynecology",
    email: "aditi.sharma@example.com",
    profilePhoto: "https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jdG9yfGVufDB8fDB8fHww",
    coordinates: { lat: "25.7580", lng: "84.1205" },
  },
  {
    username: "rohan.mehta",
    password: "Pass@123",
    fullName: "Dr. Rohan Mehta",
    location: "Rasra, Ballia",
    serviceRange: 10000,
    experience: 10,
    specialization: "Pediatrics",
    email: "rohan.mehta@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1611329828782-deb11033016b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXdlc29tZSUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { lat: "25.8556", lng: "83.8549" },
  },
  {
    username: "sneha.verma",
    password: "Pass@123",
    fullName: "Dr. Sneha Verma",
    location: "Tajpur, Ghazipur",
    serviceRange: 15000,
    experience: 6,
    specialization: "Dermatology",
    email: "sneha.verma@example.com",
    profilePhoto: "https://plus.unsplash.com/premium_photo-1664475543697-229156438e1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF3ZXNvbWUlMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D",
    coordinates: { lat: "25.6075", lng: "83.5111" },
  },
  {
    username: "amit.khanna",
    password: "Pass@123",
    fullName: "Dr. Amit Khanna",
    location: "Tajpur Dehma, Ghazipur",
    serviceRange: 5000,
    experience: 12,
    specialization: "Orthopedics",
    email: "amit.khanna@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1645066928295-2506defde470?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGF3ZXNvbWUlMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D",
    coordinates: { lat: "25.6190", lng: "83.5280" },
  },
  {
    username: "priya.nair",
    password: "Pass@123",
    fullName: "Dr. Priya Nair",
    location: "Bansdih, Ballia",
    serviceRange: 10000,
    experience: 7,
    specialization: "Cardiology",
    email: "priya.nair@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1712215544003-af10130f8eb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { lat: "25.8850", lng: "84.0614" },
  },
  {
    username: "vivek.singh",
    password: "Pass@123",
    fullName: "Dr. Vivek Singh",
    location: "Belthara Road, Ballia",
    serviceRange: 15000,
    experience: 9,
    specialization: "Neurology",
    email: "vivek.singh@example.com",
    profilePhoto: "https://plus.unsplash.com/premium_photo-1661757221486-183030ef8670?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { lat: "26.1245", lng: "83.8779" },
  },
  {
    username: "kavita.desai",
    password: "Pass@123",
    fullName: "Dr. Kavita Desai",
    location: "Dubhar, Ballia",
    serviceRange: 5000,
    experience: 11,
    specialization: "Ophthalmology",
    email: "kavita.desai@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1595543848721-7b5dd3e03168?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdvb2Rsb29rJTIwZG9jdG9yfGVufDB8fDB8fHww",
    coordinates: { lat: "25.7990", lng: "84.1090" },
  },
  {
    username: "rajesh.malhotra",
    password: "Pass@123",
    fullName: "Dr. Rajesh Malhotra",
    location: "Reoti, Ballia",
    serviceRange: 10000,
    experience: 15,
    specialization: "ENT",
    email: "rajesh.malhotra@example.com",
    profilePhoto: "https://plus.unsplash.com/premium_photo-1661778976948-0cbf766dc0e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJlYXV0aWZ1bCUyMGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { lat: "25.8443", lng: "84.3778" },
  },
  {
    username: "shreya.kapoor",
    password: "Pass@123",
    fullName: "Dr. Shreya Kapoor",
    location: "Siuri, Ballia",
    serviceRange: 15000,
    experience: 5,
    specialization: "Psychiatry",
    email: "shreya.kapoor@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8fDB8fHww",
    coordinates: { lat: "25.7910", lng: "84.2150" },
  },
  {
    username: "arjun.reddy",
    password: "Pass@123",
    fullName: "Dr. Arjun Reddy",
    location: "Manihari, Ballia",
    serviceRange: 5000,
    experience: 14,
    specialization: "General Surgery",
    email: "arjun.reddy@example.com",
    profilePhoto: "https://plus.unsplash.com/premium_photo-1677165481551-c91ed6e15f09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGdvb2Rsb29rJTIwZG9jdG9yfGVufDB8fDB8fHww",
    coordinates: { lat: "25.8330", lng: "84.1400" },
  }
];


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/GaonCare");
}

const initDB = async () => {
  await Doctor.deleteMany({});
  await Doctor.insertMany(Doctors);
   const data = await Doctor.find({})
   console.log(data)
  console.log("data was initialized");
};

initDB();