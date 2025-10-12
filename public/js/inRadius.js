const geolib = require('geolib');

// Geolib -> Npm library

// obj1-> User and obj2 -> Doctor

// isPointWithinRadius?(point, centerPoint, radius)
// Checks whether a point is inside of a circle or not.

//returns collection of {doctors} jinki jinki service range me paitient ata hai 

module.exports.inRadi =(obj1 , obj2 ,rad)=>
    geolib.isPointWithinRadius(
    obj1,
    obj2,
    rad
    )
