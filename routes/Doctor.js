const express = require("express");
const router = express.Router();

const passport = require("passport");
// Opencage-Api
const Api = require("../public/js/ApiCalls.js");
const Doctor = require("../Models/Doctor.js");





// doctor- signup              /doctor/signup


router.post("/signup" , async(req , res)=>{
    let password=req.body.doctor.password
    const newDoctor = new Doctor({...req.body.doctor})
    console.log(newDoctor)
     let location = req.body.doctor.location
    newDoctor.coordinates = await Api(location);
    let registeredDoctor = await Doctor.register(newDoctor , password)
    console.log(registeredDoctor)
    req.login(registeredDoctor , ((err)=>{
            if(err){
                return next(err);
            }
            req.flash("success" , "New Doctor Registered And LoggedIn !");
            res.redirect("/GaonCare");
      }))
})

// doctor - login           /doctor/login


router.post(
  "/login",
  passport.authenticate("doctor-local", {
    failureRedirect: "/GaonCare",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "You(Doctor) Are LoggedIn !");
    res.redirect("/GaonCare"); // absolute path
  }
);


// Toggle availability (PATCH) for doctor is available or not 

router.patch("/doctor/:id/toggleAvailability", async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await Doctor.findById(id);
    if (!doc) return res.status(404).send("Doctor not found");
    doc.isAvailable = !doc.isAvailable; // toggle
    await doc.save();
    res.json({ id: doc._id, isAvailable: doc.isAvailable });
  } catch (err) {
    next(err);
  }
});



module.exports = router;