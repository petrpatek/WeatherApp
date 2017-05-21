var React = require('react');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var Apixu = require('Apixu');
var Mappings = require('Mappings');
var Wunderground = require('Wunderground');

var WeatherProvider = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false,
      weather: "wi wi-day-sunny",
      temp: 99
    }
  },

  handleCoords: function (latitude,longitude) {
    var that = this;
    console.log('CONSOLE:', this.props.provider);
    var provider = function () {
      switch(that.props.provider) {
        case 'owm':
          return openWeatherMap;
        case 'apixu':
          return Apixu;
        case 'wunderground':
          return Wunderground;
        default:
          return openWeatherMap;
      }
    }

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined,
      id: undefined,
      weather: undefined,
    });

    provider().getWeather(latitude,longitude).then(function (data){
      //success callback
      that.setState({
        temp: data.temp,
        id: data.id,
        isLoading: false,
        weather: Mappings[that.props.provider][data.id],
      });
      //error callback
    },function(error){
      that.setState({
        isLoading: false,
        errorMessage: error.message
      });
    });
  },

  componentDidMount: function () {
    var {latitude,longitude} = this.props;
    if (!(latitude && longitude)) {
      console.log('no coords');
    } else {
      this.handleCoords(latitude,longitude);
    }
  },

  render: function () {

    var {isLoading, temp, weather} = this.state;
    var names = {
      owm: "Open Weather Map",
      apixu: "Apixu",
      wunderground: "Wunderground"
    }

    function renderMessage(){
      if (isLoading){
        return <h3 className="text-center">Fetching weather...</h3>
      } else if (temp){
        return <WeatherMessage temp={temp} weather={weather}/>;
      }
    }

    return (
      <section className="weather-provider">
        <h3 className="text-center">{names[this.props.provider]}</h3>
        {renderMessage()}
      </section>
    )
  }
});

module.exports = WeatherProvider;
