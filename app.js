const express = require("express");
const app = express();
require('dotenv').config();



// inRadi function which returns collection of {doctors} jinki jinki service range me paitient ata hai 
const {inRadi} = require("./public/js/inRadius.js")


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

//COOKIES
const cookieParser = require("cookie-parser")
app.use(cookieParser("secretcode"));

// EXPRESS SESSIONS
const session = require('express-session')

// USING (CONNECT-FLASH )TO DISPLAY ANYTHING ADDED AUR CREATED AS A FLASH FOR ONE TIME
const flash = require('connect-flash');
app.use(flash()); 


// PASSPORT AUTHENTICATION
const passport =require("passport")
const LocalStrategy = require("passport-local")

// to Serve Static files(can leave also )
app.use(express.static(path.join(__dirname, "public")));

//FOR MONGOOSE CONNECT TO NODE.JS AND DB
const mongoose = require('mongoose'); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));          //form se bheje gaye data ko read karna aur usse JavaScript object 
// const DB_URL ="mongodb://127.0.0.1:27017/GaonCare"
const deployed_Db_Url = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(deployed_Db_Url);  //   changed   DB_URL  to -->  deployed_Db_Url
}

main()
  .then(() => {
    console.log("connected to DB"); 
  })
  .catch((err) => {
    console.log(err);
  });

// Modal.................................................................
//USER MODEL
const User = require("./Models/User.js");
const { isUserLoggedIn } = require("./middleware.js");

//DOCTOR MODEL
const Doctor = require("./Models/Doctor.js");


//BOOKING MODEL
const Booking = require("./Models/Booking.js")

//ASHA MODEL
const Asha = require("./Models/Asha.js")



// integration of http and Socket.io with express app..................................

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

// expose io globally so other files (like notifications.js) can access it
app.set("io", io);

io.on("connection", (socket) => {
  console.log("✅ New socket connected:", socket.id);

  socket.on("joinDoctorRoom", (doctorId) => {
    socket.join(`doctor_${doctorId}`);
    console.log(`👨‍⚕️ Doctor joined room doctor_${doctorId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

server.listen(8080, () => {
  console.log("🚀 Server listening on http://localhost:8080/GaonCare");
});


// app.listen(8080, () => {
//   console.log("server is listening to port 8080 type    http://localhost:8080/GaonCare");
// });



//sessions..............................................................

const sessionOptions= {
secret : "secretcode",
resave :false , 
saveUninitialized : true ,

cookie :{
  expires : Date.now() + 7*24*60*60*1000 ,       // 7 din bad login expire ho jayga aur cookie delete ho jaygi
  maxAge : 7*24*60*60*1000 ,
  httpOnly : true
}
}
app.use(session(sessionOptions));

// USING AUTHENTICATION BY PASSPORT........................................................


app.use(passport.initialize());
app.use(passport.session());


// register strategies for each model
passport.use('patient-local', new LocalStrategy(User.authenticate()));
passport.use('doctor-local', new LocalStrategy(Doctor.authenticate()));
passport.use('asha-local', new LocalStrategy(Asha.authenticate()));

// custom serialize/deserialize storing type prefix "Model:id"
passport.serializeUser((user, done) => {
  const type = user.constructor.modelName; // e.g. 'User' or 'Doctor' or 'Asha'
  done(null, `${type}:${user._id}`);
});

passport.deserializeUser(async (val, done) => {
  try {
    const [type, id] = String(val).split(':');
    let model = null;
    if (type === 'User') model = User;
    else if (type === 'Doctor') model = Doctor;
    else if (type === 'Asha') model = Asha;
    else return done(new Error('Unknown user type'));

    const user = await model.findById(id).lean(); // lean optional
    if (!user) return done(null, false);
    user._model = type; // attach type for views/middleware
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});


//ab har route ke liye ek session id create hoke cookie me save ho jaygi 

// *req.user* --> yeh current logged in user ka data hoga jo bhi user login hoga uska data yaha aa jayga
// *res.locals* -->(Current request ke liye local variables) yeh data hoga jo hum templates me use karna chahte hain

// expose to views


// req.user.constructor.modelName === "Patient"
// req.user._model = req.user.constructor.modelName;

app.use((req, res, next) => {
  console.log(req.user)
  res.locals.currUser = req.user || null;
  res.locals.userType = req.user ? req.user._model : null;
  res.locals.success = req.flash && req.flash('success');  //success wala jo flash message hoga jo req me ayga wo yaha save hoga
  res.locals.error = req.flash && req.flash('error');
  next();
});

app.get("/GaonCare" , (req , res)=>{
    res.render("./index.ejs")
})


// to use User routes............................................................................................
const userRouter = require("./routes/User.js");
app.use("/user" , userRouter);

// to use Doctor routes.............................................................................
const doctorRouter = require("./routes/Doctor.js");
app.use("/doctor" , doctorRouter);

// to use Asha routes.............................................................................
const ashaRouter =require("./routes/Asha.js");
app.use("/asha" , ashaRouter);


// for emergency requests routes .............................................................................
// const bookingsRouter = require("./routes/bookings.js");
// app.use("/bookings" , bookingsRouter);

const testingRouter = require("./routes/notifications.js");
const { Socket } = require("socket.io");
app.use("/notifications" , testingRouter);

// EMERGENCY BOOKING

app.get("/Emergency" ,isUserLoggedIn, async(req, res)=>{
  let allDoctors = await Doctor.find({});
  res.render("./Emergency.ejs",{allDoctors} ,nearbyDoctors=false)
})



app.get("/nearbyDoctor" , async(req , res)=>{
  const currUser=req.user
  let allDoctors = await Doctor.find({});
  const nearbyDoctors = allDoctors.filter((el)=>{
    // console.log({latitude:currUser.coordinates.lat ,longitude: currUser.coordinates.lng })
    return inRadi(  //isPointWithinRadius?  //doctor is center point

//returns collection of {doctors} jinki jinki service range me paitient ata hai 
      {latitude:currUser.coordinates.lat ,longitude: currUser.coordinates.lng },
      {latitude :el.coordinates.lat , longitude : el.coordinates.lng},
      el.serviceRange
    )
  })
  console.log(nearbyDoctors)
  res.render("./Emergency" , {nearbyDoctors})
})


app.get("/EBookingForm/:id" , async(req,res)=>{
 const docId = req.params.id;
  let doc = await Doctor.findById(docId)
  res.render("./Booking/EBookingForm.ejs" ,{doc})
})


app.post("/conEBooking/:id" , async(req,res)=>{
  const docId = req.params;
  console.log(docId);
  const currUserLat = req.user.coordinates.lat;
  const currUserLng = req.user.coordinates.lng;
  const currUserId = req.user.id;

  const newBooking = new Booking({
    patient:currUserId,
    doctor:docId,
    location:{lat:currUserLat , lng :currUserLng}
  })
  await newBooking.save();
  console.log(newBooking)
  console.log(" NewBooking Created")
  req.flash("success" ,`Emergency Booking request sent! Check in My Booking Section`)
  res.redirect("/GaonCare")
})






//Express ka error-handling middleware
app.use((err , req , res , next)=>{
  console.log(err.message)
  let {status=500 , message="Koi Msg nahi aya err me "}= err;
  // res.send(err)
  res.status(status).send(message)
})

