var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=14e1ac10971152058d5bf2b339bc78bc&units=metric';

// 14e1ac10971152058d5bf2b339bc78bc

module.exports = {

  getWeather: function(latitude,longitude){
    var elat = encodeURIComponent(latitude);
    var elon = encodeURIComponent(longitude);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&lat=${elat}&lon=${elon}`;

    return axios.get(requestUrl).then(function(res){
      // console.log(res);
      var temp = res.data.main.temp;
      var id = res.data.weather[0].id;
      // console.log(temp);
      // console.log(id);
      return {
        temp: temp,
        id: id
      }
    }).catch(function () {
      throw new Error("Coords not found in OpenWeatherMap.");
    });
  }
};
