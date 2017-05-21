var axios = require('axios');

const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAfF0hoiYIH0NFzx4nmb090QuJFYgpU-x0';

// AIzaSyAfF0hoiYIH0NFzx4nmb090QuJFYgpU-x0

module.exports = {
  getCoords: function(location){
    var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${GOOGLE_URL}&address=${encodedLocation}`;

    return axios.get(requestUrl).then(function(res){
      // console.log(res);
      var address = res.data.results[0].formatted_address;
      var lat = res.data.results[0].geometry.location.lat;
      var lng = res.data.results[0].geometry.location.lng;
      // console.log(lat);
      // console.log(lng);
      return {
        address: address,
        lat: lat,
        lng: lng
      }
    }).catch(function () {
      throw new Error("Google couldn't find coords for this location.");
    });
  },

  getAddress: function(lat,lng) {
    var eLat = encodeURIComponent(lat);
    var eLng = encodeURIComponent(lng);
    var requestUrl = `${GOOGLE_URL}&latlng=${eLat},${eLng}&result_type=locality`;
    // console.log(eLat,eLng,requestUrl);

    return axios.get(requestUrl).then(function(res){
      // console.log(res);
      var address = res.data.results[0].formatted_address;
      // console.log(address);
      return address;
    }).catch(function () {
      throw new Error("Google couldn't find address for given coords.");
    });
  }
};
