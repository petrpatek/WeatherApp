var React = require('react');

require("jquery-ui/ui/widgets/datepicker")

var Register = React.createClass({

    componentDidMount: function () {
      $( function() {
        $( "#birthday" ).datepicker({
          changeMonth: true,
          changeYear: true,
          dateFormat: "dd-mm-yy",
          yearRange: "1900:+00",
          minDate: "01-01-1900",
          maxDate: "0",
          hideIfNoPrevNext: true
        });
      });
    },

    render: function () {
      return (
        <section>
          <form>
            <label htmlFor="email">E-mail <i className="fa fa-star" aria-hidden="true"></i></label>

            <input id="email" type="email" name="email"
              placeholder="your e-mail" max="50" required/>

            <label htmlFor="password">Password <i className="fa fa-star" aria-hidden="true"></i></label>
            <input id="password" type="password" name="password"
              placeholder="your password" min="6" max="50" required/>

            <label htmlFor="repassword">Retype password <i className="fa fa-star" aria-hidden="true"></i></label>
            <input id="repassword" type="password" name="password"
              placeholder="retype password" min="6" max="50" required/>
            <div className="row">
              <div className="medium-6 column">
                <label htmlFor="firstname">Name</label>
                <input id="firstname" type="text" name="firstname" max="50"/>
              </div>
              <div className="medium-6 column">
                <label htmlFor="lastname">Surname</label>
                <input id="lastname" type="text" name="lastname" max="50"/>
              </div>
            </div>
            <div className="row">
              <div className="medium-6 column">
                <label htmlFor="birthday">Your birthday</label>
                <input id="birthday" type="text" name="birthday"/>
              </div>
              {/* <div className="medium-6 column">
                <label htmlFor="terms">Agree with terms</label>
                <input id="terms" type="checkbox" name="terms" required/>
              </div> */}
            </div>

            <div className="callout clearfix">
              <button type="submit" className="button hollow warning float-right">Register</button>
            </div>
          </form>
        </section>
      )
    }
});

module.exports = Register;
