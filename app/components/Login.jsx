var React = require('react');
var {Link} = require('react-router');

var Login = (props) => {
  return (
    <div>
      <form>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" name="email" placeholder="your e-mail" required/>
        <label htmlFor="password">Password</label>
        <input id="password" type="password"
          name="password" placeholder="your password" required/>

        <label htmlFor="remember">Remember me</label>
        <input id="remember" type="checkbox" name="remember"/>
        <a href="" className="float-right forgotpass">forgot password?</a>
        <div className="callout clearfix">
          <button type="submit" className="button hollow warning float-right">Login</button>
        </div>

      </form>
      <section>
          <h4>You still don't have an account?</h4>
          <p>Join us! And choose your own weather providers.</p>
          <form className="callout clearfix">
              <Link to="/register"><button className="button hollow warning float-right">Register</button></Link>
          </form>

      </section>
    </div>
  )
}

module.exports = Login;
