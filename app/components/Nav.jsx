var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = (props) => {
    return (
      <nav className="top-bar">
        <div className="top-bar-left">
          <ul className="menu" id="pagetitle">
            <li><IndexLink to="/">Aweatherage</IndexLink></li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
      </nav>
    );
}


module.exports = Nav;
