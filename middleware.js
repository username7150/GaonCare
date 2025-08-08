const ExpressError = require("./ErrorHandler/ExpressError")

module.exports.isUserLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        throw new ExpressError(400 , "User is not logged in")
    }
    next();
}