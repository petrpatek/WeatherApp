var React = require('react');
var Storage = require('Storage');

var Settings = React.createClass({
  getInitialState: function () {
  var providers = Storage.getProviders();
  if (providers) {
    return {
      ...providers
    }
  } else {
    return {
      owm: true,
      apixu: false,
      wunderground: false
    }
  }

  },

  componentWillUnmount: function () {
    Storage.setProviders(this.state);
  },

  render: function () {
    var {owm, apixu, wunderground} = this.state;

    var classToggle = function (provider) {
      if (provider) {
        return "tp-on"
      } else {
        return "tp-off"
      }
    };

    var iconToggle = function (provider) {
      if (provider) {
        return "settings-icon fa fa-check"
      } else
      return "settings-icon fa fa-times"
    };

    return (
      <div>
        <section>
            <h3 className="text-center headings">Choose your weather providers</h3>
        </section>
        <section className="settings-list">
            <ul>
              <li onClick={() => {this.setState({owm: !owm})}} className={classToggle(owm)}>
                <span className={classToggle(owm)}>
                  <i className={iconToggle(owm)}></i>
                </span>
                Open Weather Map
              </li>
              <li onClick={() => {this.setState({apixu: !apixu})}} className={classToggle(apixu)}>
                <span className={classToggle(apixu)}>
                  <i className={iconToggle(apixu)}></i>
                </span>
                Apixu
              </li>
              <li onClick={() => {this.setState({wunderground: !wunderground})}} className={classToggle(wunderground)}>
                <span className={classToggle(wunderground)}>
                  <i className={iconToggle(wunderground)}></i>
                </span>
                Wunderground
              </li>
            </ul>
        </section>
      </div>
    )
  }
});

module.exports = Settings;
