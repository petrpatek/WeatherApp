var axios = require('axios');

const APIXU_URL = 'https://api.apixu.com/v1/current.json?key=b7adb80aa5fe4cebb2d151720171405&q=';

// b7adb80aa5fe4cebb2d151720171405

module.exports = {

  getWeather: function(latitude,longitude){
    var elat = encodeURIComponent(latitude);
    var elon = encodeURIComponent(longitude);
    var requestUrl = `${APIXU_URL}${elat},${elon}`;

    return axios.get(requestUrl).then(function(res){
      // console.log(res);
      var temp = res.data.current.temp_c;
      var icon = res.data.current.condition.icon;

      var matches = icon.match(/\d{3}/);
      // console.log('MATCHES', matches);
      var id = Number(matches);

      // console.log('APIXU:', temp);
      // console.log('APIXU:', id);
      return {
        temp,
        id
      }
    }).catch(function () {
      throw new Error("Coords not found in Apixu.");
    });
  }
};
