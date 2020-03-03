import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  errors: {}
};

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      const { user } = nextProps.auth;
      this.props.history.push(`/dashboard/${user.id}`);
      // push user to dashboard when they login
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

  validate = () => {
    let emailError = "";
    let passwordError = "";
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
      this.props.loginUser(userData);
      // clear form for removing error if fields are valid
      this.setState(initialState);
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                className={classnames("login-input", {
                  "email is invalid": errors.email
                })}
                placeholder="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
              />
              <span className="red-text" style={{ fontSize: 12, color: "red" }}>
                {this.state.emailError}
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className={classnames("login-input", {
                  "password is invalid": errors.password
                })}
                placeholder="Password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
              />
            </div>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}

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
