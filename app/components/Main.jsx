var React = require('react');
var Nav = require('Nav');

var Main = (props) => {
    return (
      <main>
        <Nav/>
        <div className="row main">
          <div className="columns medium-6 large-6 small-centered">
            {props.children}
          </div>
        </div>
      </main>
    );
}


module.exports = Main;
