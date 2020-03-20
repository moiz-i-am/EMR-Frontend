import React from "react";
import "./signstyle.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";

import {
  registerUser,
  registerHospital,
  registerLab
} from "./../actions/authActions";

// const initialState = props => ({
//   username: "",
//   email: "",
//   password: "",
//   OrName: "",
//   OrLocation: "",
//   usernameError: "",
//   emailError: "",
//   passwordError: "",
//   role: props.location.roleProps,
//   errors: {}
// });

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      OrName: "",
      OrLocation: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
      role: this.props.location.roleProps,
      errors: {}
    };
    //this.state = initialState(props);
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
      const { user } = this.props.auth;
      this.props.history.push(`/dashboard/${user.id}`);
    }
  }

  validate = () => {
    let usernameError = "";
    let emailError = "";
    let passwordError = "";

    if (!this.state.username.match(/^[a-zA-Z ]*$/)) {
      usernameError = "*Please enter alphabet characters only.";
    }

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(this.state.email)) {
      // if (!this.state.email.includes("@")) {
      emailError = "*Please enter valid email address";
    }
    if (
      !this.state.password.match(
        /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/
      )
    ) {
      passwordError = "*Please enter secure and strong password.";
    }
    if (usernameError || emailError || passwordError) {
      this.setState({ usernameError, emailError, passwordError });
      return false;
    }
    return true;
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    };
    const newHospital = {
      userName: this.state.username,
      email: this.state.email,
      password: this.state.password,
      name: this.state.OrName,
      role: this.state.role,
      location: this.state.OrLocation
    };
    const newLab = {
      userName: this.state.username,
      email: this.state.email,
      password: this.state.password,
      name: this.state.OrName,
      role: this.state.role,
      location: this.state.OrLocation
    };
    const isValid = this.validate();
    if (isValid) {
      if (this.state.role === "hospital") {
        //console.log(newHospital);
        this.props.registerHospital(newHospital, this.props.history);
      } else if (this.state.role === "lab") {
        //console.log(newLab);
        this.props.registerLab(newLab, this.props.history);
      } else {
        //console.log(newUser);
        this.props.registerUser(newUser, this.props.history);
      }
      //this.setState(initialState());
    }
  };

  render() {
    /////////////////////////// conditional rendring ///////////////////

    /////////////////////////// for hospital //////////////////////////

    let hospital;
    if (this.state.role === "hospital") {
      hospital = (
        <div>
          <div className="input-group">
            <label htmlFor="hospitalName">Hospital Name</label>
            <input
              type="text"
              name="OrName"
              className="login-input"
              placeholder="Hospital Name"
              onChange={this.onChange}
              value={this.state.OrName}
            />
            <span className="red-text"></span>
          </div>
          <div className="input-group">
            <label htmlFor="hospitalLocation">Hospital Location</label>
            <input
              type="text"
              name="OrLocation"
              className="login-input"
              placeholder="Hospital Location"
              onChange={this.onChange}
              value={this.state.OrLocation}
            />
            <span className="red-text"></span>
          </div>
        </div>
      );
    }

    //////////////////////////// for lab ////////////////////////////

    let lab;
    if (this.state.role === "lab") {
      lab = (
        <div>
          <div className="input-group">
            <label htmlFor="labName">Lab Name</label>
            <input
              type="text"
              name="OrName"
              className="login-input"
              placeholder="lab Name"
              onChange={this.onChange}
              value={this.state.OrName}
            />
            <span className="red-text"></span>
          </div>
          <div className="input-group">
            <label htmlFor="labLocation">Lab Location</label>
            <input
              type="text"
              name="OrLocation"
              className="login-input"
              placeholder="Lab Location"
              onChange={this.onChange}
              value={this.state.OrLocation}
            />
            <span className="red-text"></span>
          </div>
        </div>
      );
    }

    //////////////////////////// normal rendring ///////////////////

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
                placeholder="Username"
                onChange={this.onChange}
                value={this.state.username}
                error={errors.username}
                className={classnames("login-input", {
                  invalid: errors.username
                })}
              />
              <span className="red-text" style={{ fontSize: 12, color: "red" }}>
                {this.state.usernameError}
              </span>
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
              <span className="red-text" style={{ fontSize: 12, color: "red" }}>
                {this.state.emailError}
              </span>
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
              <span className="red-text" style={{ fontSize: 12, color: "red" }}>
                {this.state.passwordError}
              </span>
            </div>
            {hospital}
            {lab}
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

export default connect(mapStateToProps, {
  registerUser,
  registerHospital,
  registerLab
})(withRouter(Signup));
