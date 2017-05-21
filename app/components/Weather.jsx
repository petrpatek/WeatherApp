var React = require('react');

var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');
var Mappings = require('Mappings');
var WeatherProvider = require('WeatherProvider');
var googleGeocode = require('googleGeocode');
var Storage = require('Storage');


var Weather = React.createClass({
  getInitialState: function(){

    var providers = Storage.getProviders();
    var providersArray = []
    if (providers) {

      for (var key in providers) {
        if (providers.hasOwnProperty(key)) {
          if (providers[key]) {
            providersArray.push(key);
          }
        }
      }
      return {
        isLoading: false,
        noCoords: true,
        providersArray
      }
    } else {
      return {
        isLoading: false,
        noCoords: true,
        providersArray: ['owm']
      }
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
        address: data.address,
        noCoords: false
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
    var error = localStorage.getItem('gps_error');
    if (!(error === "true")) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // console.log(position);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        that.setState({
          latitude,
          longitude
        });

        that.getLocationFromCoords(latitude,longitude);

      }, function(err) {
        console.log(err);
        localStorage.setItem('gps_error', "true");
        that.setState({
          noCoords: true
        });
      });
    }
  },

  render: function () {
    var {isLoading, errorMessage, latitude, longitude, noCoords, address,providersArray} = this.state;
    var that = this;
    var key = 1;


    function renderWeatherProvider (provider) {
      if (isLoading) {
        return <h3 className="text-center">Loading Location</h3>
      } else if (latitude && longitude && provider) {
        return <WeatherProvider key={key++} latitude={latitude} longitude={longitude} provider={provider}/>
      }
    }

    var renderProviders = () => {
      if (providersArray.length === 0) {
        return (
          <h3 className="text-center headings">Select a weather provider in settings</h3>
        );
      } else {
        // console.log(providersArray, providersArray.length);
        return providersArray.map((provider) => {
          var p = renderWeatherProvider(provider);
          // console.log('PROVIDER:', provider, p);
          return renderWeatherProvider(provider);
        });
      }
    };

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
          <h3 className="text-center headings">Your location: {address}</h3>
        )
      }
    }

    return (
      <section className="centertext">
        {renderForm()}
        {renderProviders()}
        {renderError()}
      </section>
    );
  }
});

module.exports = Weather;
