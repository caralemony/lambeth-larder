const NodeGeocoder = require("node-geocoder");
const API_KEY = require("../../config.js");

const options = {
  provider: "google",
  Key: API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

const getCoords = (pc, cb) => {
  geocoder
    .geocode(pc)
    .then(function(res) {
      const latLong = [res[0].latitude, res[0].longitude];
      cb(latLong);
      console.log(latLong);
    })
    .catch(function(err) {
      console.log(err);
    });
};