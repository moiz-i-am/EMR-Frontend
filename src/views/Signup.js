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

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      OrName: "",
      OrLocation: "",
      role: this.props.location.roleProps,
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
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
    // const { handle } = this.props.params;
    // const { userRole } = this.props.location.state;
    // console.log(userRole);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      userName: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    };
    const newHospital = {
      userName: this.state.username,
      email: this.state.email,
      password: this.state.password,
      name: this.state.OrName,
      location: this.state.OrLocation
    };
    const newLab = {
      userName: this.state.username,
      email: this.state.email,
      password: this.state.password,
      name: this.state.OrName,
      location: this.state.OrLocation
    };
    if (this.state.role === "hospital") {
      this.props.registerHospital(newHospital, this.props.history);
      //console.log(newHospital);
    } else if (this.state.role === "lab") {
      this.props.registerLab(newLab, this.props.history);
      //console.log(newUser);
    } else {
      this.props.registerUser(newUser, this.props.history);
      //console.log(newUser);
    }
    //console.log(newUser);
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
