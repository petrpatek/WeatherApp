var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var ErrorModal = React.createClass({

  getDefaultProps: function () {
    return {
      title: 'Error',
      message: 'missing message'
    }
  },
  propTypes: {
    title: React.PropTypes.string,
    message: React.PropTypes.string.isRequired
  },
  componentDidMount: function () {
    var {title, message} = this.props;
    var modalMarkup = (
      <div id="error-modal" className="reveal tiny text-center" data-reveal="">
        <h4>{title}</h4>
        <p>{message}</p>
        <div>
          <button className="button hollow" data-close="">
            Okay
          </button>
        </div>
      </div>
    );

    var $modal = $(ReactDOMServer.renderToString(modalMarkup));
    $(ReactDOM.findDOMNode(this)).html($modal);

    var modal = new Foundation.Reveal($('#error-modal'));
    modal.open();
  },
  render: function () {

    return (
      <div>
      </div>
    );
  }
});

module.exports = ErrorModal;
