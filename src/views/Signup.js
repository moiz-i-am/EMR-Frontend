import React from "react";
import "./signstyle.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";

import { registerUser } from "./../actions/authActions";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidUpdate(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="inner-container">
        <div className="header">Register</div>
        <div className="box">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className={classnames("login-input", {
                  invalid: errors.username
                })}
                placeholder="Username"
                onChange={this.onChange}
                value={this.state.username}
                error={errors.username}
              />
              <span className="red-text">{errors.username}</span>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className={classnames("login-input", {
                  invalid: errors.email
                })}
                placeholder="Email"
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
              Register
            </button>
          </form>
        </div>
        <p>
          <Link to="/Login">already registered? Login</Link>
        </p>
      </div>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
