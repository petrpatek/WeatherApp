var React = require('react');

var WeatherMessage = ({temp, location, weather}) => {
    return (
      <section>
        <p className="text-center icon-wrapper"><i className={weather}></i></p>
        <h3 className="text-center">{Math.round(temp)}°C</h3>
      </section>
    );
}

module.exports = WeatherMessage;
