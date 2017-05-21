var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');
var Mappings = require('Mappings');


var Weather = React.createClass({
  getInitialState: function(){
    return {
      isLoading: false,
      weather: "wi wi-day-sunny"
    }
  },
  handleSearch: function(location){
    var that = this;

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined,
      id: undefined,
      weather: undefined
    });

    openWeatherMap.getTempWithLocation(location).then(function (data){
      //success callback
      that.setState({
        location: location,
        temp: data.temp,
        id: data.id,
        isLoading: false,
        weather: Mappings[data.id],
        name: data.name
      });
      //error callback
    },function(error){
      that.setState({
        isLoading: false,
        errorMessage: error.message
      });
    });

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
      name: undefined
    });

    openWeatherMap.getTempWithCoords(latitude,longitude).then(function (data){
      //success callback
      that.setState({
        temp: data.temp,
        id: data.id,
        isLoading: false,
        weather: Mappings[data.id],
        name: data.name
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
    var location = this.props.location.query.location;
    var that = this;

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/';
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      that.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      var {latitude,longitude} = that.state;
      that.handleCoords(latitude,longitude);

    }, function(err) {
      console.log(err);
      that.setState({
        noCoords: true
      });
    });

  },
  render: function () {
    var {isLoading, temp, name, errorMessage, weather, latitude, longitude,noCoords} = this.state
    var that = this;
    function renderMessage(){
      if (isLoading){
        return <h3>Fetching weather...</h3>
      } else if (temp && name){
        return <WeatherMessage temp={temp} location={name} weather={weather}/>;
      }
    }

    function renderError () {
      if (typeof errorMessage === 'string') {
        return (
          <ErrorModal message={errorMessage}/>
        )
      }
    }

    function renderForm () {
      if (noCoords){
        return (
          <WeatherForm onSearch={that.handleSearch}/>
        )
      }
    }

    return (
      <section>
        <h1 className="text-center page-title">Weather Component</h1>
        {renderMessage()}
        {renderError()}
        {renderForm()}
      </section>
    );
  }
});

module.exports = Weather;
