const express = require("express");
const router = express.Router();
const passport = require("passport");
// Opencage-Api
const Api = require("../public/js/ApiCalls.js");
const User = require("../Models/User.js");

// user- signup              /user/signup

router.post("/signup", async (req, res) => {
  let password = req.body.user.password;
  let newUser = new User({ ...req.body.user });
  let location = req.body.user.location;
  newUser.coordinates = await Api(location);
  let registeredUser = await User.register(newUser, password);
  console.log(registeredUser);
  req.login(registeredUser, (err) => {
    if (err) {
      return next(err);
    }
    req.flash(
      "success",
      "Welcome   to GaonCare !You Are Registered and LoggedIn "
    );
    res.redirect("/GaonCare");
  });
});

// user - login           /user/login

router.post(
  "/login",
  passport.authenticate("patient-local", {
    failureRedirect: "/GaonCare",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "You(Paitient) Are LoggedIn !");
    res.redirect("/GaonCare"); // absolute path
  }
);

//user- logout

// POST se bhi — dono valid hain, par recommended hai → POST beacause it changes the server state (logs out the user).

router.post("/signout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You Are LoggedOut !");
    res.redirect("/GaonCare"); // absolute path
  });
});

module.exports = router;
