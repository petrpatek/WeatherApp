var React = require('react');

var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');
var Mappings = require('Mappings');
var WeatherProvider = require('WeatherProvider');
var googleGeocode = require('googleGeocode');


var Weather = React.createClass({
  getInitialState: function(){
    return {
      isLoading: false,
      noCoords: false
    }
  },

  getLocationFromCoords: function (latitude,longitude) {
    var that = this;
    googleGeocode.getAddress(latitude,longitude).then(function (data) {
      that.setState({
        isLoading: false,
        address: data,
        latitude,
        longitude,
        noCoords: false
      });
    }, function(error) {
      that.setState({
        isLoading: false,
        errorMessage: error.message
      });
    });
  },

  getCoordsFromLocation: function (location) {
    var that = this;
    googleGeocode.getCoords(location).then(function (data){
      //success callback
      that.setState({
        location: location,
        latitude: data.lat,
        longitude: data.lng,
        isLoading: false,
        address: data.address
      });
      //error callback
    },function(error){
      that.setState({
        isLoading: false,
        errorMessage: error.message
      });
    });
  },

  handleSearch: function(location){

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined,
      id: undefined,
      weather: undefined
    });

    this.getCoordsFromLocation(location);

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
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      that.setState({
        latitude,
        longitude
      });

      that.getLocationFromCoords(latitude,longitude);

    }, function(err) {
      console.log(err);
      that.setState({
        noCoords: true
      });
    });

  },

  render: function () {
    var {isLoading, errorMessage, latitude, longitude, noCoords, address} = this.state;
    var that = this;

    function renderWeatherProvider () {
      if (isLoading) {
        return <h3 className="text-center">Loading Location</h3>
      } else if (latitude && longitude) {
        return <WeatherProvider latitude={latitude} longitude={longitude}/>
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
      } else {
        return (
          <p className="text-center">Your location: {address}</p>
        )
      }
    }

    return (
      <section>
        {renderWeatherProvider()}
        {renderError()}
        {renderForm()}
      </section>
    );
  }
});

module.exports = Weather;
