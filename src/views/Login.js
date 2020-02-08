import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: "patient",
      errors: {}
    };
  }

  com(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="email"
                name="email"
                className={classnames("login-input", {
                  invalid: errors.email
                })}
                placeholder="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className={classnames("login-input", {
                  invalid: errors.password
                })}
                placeholder="Password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
        <p>
          <Link to="/Signup">not registered yet? Please Register!</Link>
        </p>
      </div>
    );
  }
}

LoginBox.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginUser })(LoginBox);
