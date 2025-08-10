const geolib = require('geolib');


module.exports.inRadi =(obj1 , obj2 ,rad)=>
    geolib.isPointWithinRadius(
    obj1,
    obj2,
    rad
    )
