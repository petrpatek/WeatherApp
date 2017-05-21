var React = require('react');
var Nav = require('Nav');

var Main = (props) => {
    return (
      <main>
        <Nav/>
        <div className="row main">
          <div className="columns medium-12 large-12 small-centered">
            {props.children}
          </div>
        </div>
      </main>
    );
}


module.exports = Main;
