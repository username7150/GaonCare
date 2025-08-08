const geolib = require('geolib');


module.exports.inRadi =
    geolib.isPointWithinRadius(
    { latitude: 51.525, longitude: 7.4575 },
    { latitude: 51.5175, longitude: 7.478 },
    5000
    )
