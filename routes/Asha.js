const express = require("express");
const router = express.Router();

const passport = require("passport");
const Asha = require("../Models/Asha.js");

// for Asha Dashboard
router.get("/", (req, res) => {
  res.render("AshaDashboard.ejs");
});

// for Asha login  at /asha/login

router.post(
  "/login",
  passport.authenticate("asha-local", {
    failureRedirect: "/GaonCare",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "You(Asha) Are LoggedIn !");
    res.redirect("/GaonCare"); // absolute path
  }
);

// for Asha signup  at /asha/signup

router.post("/signup", async(req, res) => {
    const newAsha = new Asha({...req.body.asha});
    const password = req.body.asha.password;
    let registeredAsha =await Asha.register(newAsha , password);
    console.log("New Asha registered with details " ,registeredAsha );
    res.send("done")



})



module.exports = router;