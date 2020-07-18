import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import { popupLoginUser } from "../actions/authActions";

import Logo from "../assets/L.png";

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  errors: {}
};

class LoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  validate = () => {
    let emailError = "";
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(this.state.email)) {
      // if (!this.state.email.includes("@")) {
      emailError = "* Please enter valid email address";
    }
    if (
      !this.state.password.match(
        /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/
      )
    )
      if (emailError) {
        this.setState({ emailError });
        return false;
      }
    return true;
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    const isValid = this.validate();
    if (isValid) {
      this.props.popupLoginUser(userData);
      // clear form for removing error if fields are valid
      this.setState(initialState);
    }
    //console.log("data: " + userData.email + " " + userData.password);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div class="limiter">
          <div class="container-login100">
            <div class="wrap-login100">
              <div class="login100-pic js-tilt" data-tilt>
                <img src={Logo} />
              </div>
              <form
                class="login100-form validate-form"
                noValidate
                onSubmit={this.onSubmit}
              >
                <span class="login100-form-title">Member Login</span>
                <div
                  class="wrap-input100 validate-input"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <input
                    class="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.onChange}
                  />
                  <span class="focus-input100"></span>
                  <span class="symbol-input100">
                    <Icon name="mail" />
                  </span>
                </div>
                <div
                  class="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <input
                    class="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                  <span class="focus-input100"></span>
                  <span class="symbol-input100">
                    <Icon name="key" />
                  </span>
                </div>
                <div class="container-login100-form-btn">
                  <button type="submit" class="login100-form-btn">
                    Login
                  </button>
                </div>
                <div class="text-center p-t-12">
                  <span class="txt1">Forgot</span>
                  <a class="txt2" href="#">
                    Username / Password?
                  </a>
                </div>
                <div class="text-center p-t-136">
                  <Link class="txt2" to="/SignupSelector">
                    Create your Account
                    <i
                      class="fa fa-long-arrow-right m-l-5"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPopup.propTypes = {
  popupLoginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { popupLoginUser })(LoginPopup);

// export default LoginPopup;
