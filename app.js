const express = require("express");
const app = express();
// for basic ejs only-->
const path = require("path");
app.set("view engine" ,"ejs")
app.set("views" , path.join(__dirname , "views"));

// for ejs-Mate(Boilerplate)
const ejsMate = require("ejs-mate")
app.engine("ejs" , ejsMate);

//  CUSTOM ERROR HANDLER
const ExpressError = require("./ErrorHandler/ExpressError.js")
const WrapAsync =require("./ErrorHandler/WrapAsync.js");

// PASSPORT AUTHENTICATION
const passport =require("passport")
const localStrategy = require("passport-local")
const User = require("./Models/User.js")

// to Serve Static files(can leave also )
// app.use(express.static(path.join(__dirname , "./public")));
app.use(express.static(path.join(__dirname, "public")));

//FOR MONGOOSE CONNECT TO NODEJS AND DB
const mongoose = require('mongoose');
// app.use(express.json()); C USE KAR RHA
app.use(express.urlencoded({ extended: true }));          //form se bheje gaye data ko read karna aur usse JavaScript object 
const DB_URL ="mongodb://127.0.0.1:27017/GaonCare"
async function main() {
  await mongoose.connect(DB_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(8080, () => {
  console.log("server is listening to port 8080 type    http://localhost:8080/GaonCare");
});

app.use( "/GaonCare" ,(req , res, next)=>{
  const {token} =req.query;
  if(token ==="giveaccess"){
    return next();
  }else{
    throw new ExpressError(404,  "Access Denied Bro")
  }
});

app.use((err , req , res , next)=>{
  console.log(err.message)
  let {status=500 , message="Koi Msg nahi aya err me "}= err;
  // res.send(err)
  res.status(status).send(message)
})
app.get("/GaonCare" , (req , res)=>{
    res.render("./index.ejs")
    
})
