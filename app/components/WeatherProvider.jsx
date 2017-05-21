var React = require('react');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var Mappings = require('Mappings');

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

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined,
      id: undefined,
      weather: undefined,
    });

    openWeatherMap.getWeather(latitude,longitude).then(function (data){
      //success callback
      that.setState({
        temp: data.temp,
        id: data.id,
        isLoading: false,
        weather: Mappings[data.id],
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

    var {isLoading, temp, weather} = this.state

    function renderMessage(){
      if (isLoading){
        return <h3 className="text-center">Fetching weather...</h3>
      } else if (temp){
        return <WeatherMessage temp={temp} weather={weather}/>;
      }
    }

    return (
      <section>
        <h3 className="text-center">Open Weather Map</h3>
        {renderMessage()}
      </section>
    )
  }
});

module.exports = WeatherProvider;
