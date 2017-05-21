var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var Main = require('Main');
var Weather = require('Weather');
var Login = require('Login');
var Register = require('Register');
var Settings = require('Settings');

require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();
require('style!css!sass!appStyles');
require('style!css!weather-icons/css/weather-icons.css');



ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="settings" component={Settings}/>
      <IndexRoute component={Weather}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
