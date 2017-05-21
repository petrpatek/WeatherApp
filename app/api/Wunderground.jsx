var axios = require('axios');

const WUNDERGROUND_URL = 'http://api.wunderground.com/api/5451690fb39e0527/conditions/q/';

// 5451690fb39e0527

module.exports = {
  getWeather: function(latitude,longitude){
    var elat = encodeURIComponent(latitude);
    var elon = encodeURIComponent(longitude);
    var requestUrl = `${WUNDERGROUND_URL}${elat},${elon}.json`;

    return axios.get(requestUrl).then(function(res){
      console.log(res);
      var temp = res.data.current_observation.temp_c;
      var id = res.data.current_observation.icon;
      console.log(temp);
      console.log(id);
      return {
        temp,
        id
      }
    }).catch(function () {
      throw new Error("Coords not found in Wunderground.");
    });
  }
};
