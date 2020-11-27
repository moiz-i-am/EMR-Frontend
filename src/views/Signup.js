import React from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";

import {
  registerUser,
  registerHospital,
  registerLab
} from "../actions/authActions";
import {
  Grid,
  Form,
  Input,
  Segment,
  Header,
  Button,
  Message,
  Icon
} from "semantic-ui-react";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      OrName: "",
      OrLocation: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      hidden: true,
      role: this.props.location.roleProps,
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props.auth;
      this.props.history.push(`/dashboard/${user.id}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.message === "Validation Error") {
      this.setState({
        error: "please fill out all fields"
      });
    } else {
      this.setState({
        error: nextProps.error.message
      });
    }
  }

  validate = () => {
    let usernameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    if (!this.state.username.match(/^[a-zA-Z ]*$/)) {
      usernameError = "* Please enter alphabet characters only.";
    } else if(this.state.username.length < 3) {
      usernameError = "* Please enter name with atleast 3 characters."
    }

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!pattern.test(this.state.email)) {
      // if (!this.state.email.includes("@")) {
      emailError = "* Please enter valid email address";
    } else if (!this.state.email.includes("@gmail")) {
      if(!this.state.email.includes("@yahoo")) {
        if(!this.state.email.includes("@outlook")) {
          emailError = "* Please enter valid email address"
        }
      }
    }

    if (
      !this.state.password.match(
        /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/
      )
    ) {
      passwordError = "* Please enter secure and strong password.";
    }
    if (!this.state.confirmPassword.match(this.state.password)) {
      confirmPasswordError = "* Please Make sure passwords are same";
    }
    if (usernameError || emailError || passwordError || confirmPasswordError) {
      this.setState({
        usernameError,
        emailError,
        passwordError,
        confirmPasswordError
      });
      return false;
    } else {
      this.setState({
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: ""
      });
      return true;
    }
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

  toggleShow = () => {
    this.setState({hidden : !this.state.hidden});
  }

  render() {
    /////////////////////////// conditional rendring ///////////////////

    /////////////////////////// for hospital //////////////////////////

    let hospital;
    if (this.state.role === "hospital") {
      hospital = (
        <Form>
          <Form.Field required>
            <Input
              size="small"
              icon="hospital"
              iconPosition="left"
              type="text"
              name="OrName"
              className="login-input"
              placeholder="Hospital Name"
              onChange={this.onChange}
              value={this.state.OrName}
            />
            <span className="red-text"></span>
          </Form.Field>

          <Form.Field required>
            <Input
              type="text"
              size="small"
              icon="point"
              iconPosition="left"
              name="OrLocation"
              className="login-input"
              placeholder="Hospital Location"
              onChange={this.onChange}
              value={this.state.OrLocation}
            />
            <span className="red-text"></span>
          </Form.Field>
          <span />
        </Form>
      );
    }

    //////////////////////////// for lab ////////////////////////////

    let lab;
    if (this.state.role === "lab") {
      lab = (
        <Form>
          <Form.Field required>
            <Input
              type="text"
              size="small"
              icon="lab"
              iconPosition="left"
              name="OrName"
              className="login-input"
              placeholder="lab Name"
              onChange={this.onChange}
              value={this.state.OrName}
            />
            <span className="red-text"></span>
          </Form.Field>

          <Form.Field required>
            <Input
              type="text"
              size="small"
              icon="point"
              iconPosition="left"
              name="OrLocation"
              className="login-input"
              placeholder="Lab Location"
              onChange={this.onChange}
              value={this.state.OrLocation}
            />
            <span className="red-text"></span>
          </Form.Field>
          <span />
        </Form>
      );
    }

    ///////////////////////for tips section/////////////////////////

    //////////////////////////// normal rendring ///////////////////

    const { error } = this.state;
    return (
      <Grid className="container" divided="vertically" padded="vertically">
        <Grid.Row columns={2}>
          <Grid.Column style={{ maxWidth: 500 }}>
            <Segment>
              <p style={{ height: "30px" }}>{error}</p>
              <Form noValidate onSubmit={this.onSubmit}>
                <Header as="h2" textAlign="center" content="Register" />
                <Form.Field required>
                  <Input
                    type="text"
                    size="small"
                    icon="user"
                    iconPosition="left"
                    name="username"
                    placeholder="Full Name"
                    onChange={this.onChange}
                    value={this.state.username}
                  />
                  <span
                    className="red-text"
                    style={{ fontSize: 12, color: "red", fontWeight: "bold" }}
                  >
                    {this.state.usernameError}
                  </span>
                </Form.Field>

                <Form.Field required>
                  <Input
                    type="text"
                    size="small"
                    name="email"
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  <span
                    className="red-text"
                    style={{ fontSize: 12, color: "red", fontWeight: "bold" }}
                  >
                    {this.state.emailError}
                  </span>
                </Form.Field>

                <Form.Field required>
                  <Input
                    type={this.state.hidden ? 'password' : 'text'}
                    size="small"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  <span
                    className="red-text"
                    style={{ fontSize: 12, color: "red", fontWeight: "bold" }}
                  >
                    {this.state.passwordError}
                  </span>
                </Form.Field>

                <Form.Field required>
                  <Input
                    type={this.state.hidden ? 'password' : 'text'}
                    size="small"
                    icon="lock"
                    iconPosition="left"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={this.onChange}
                    value={this.state.confirmPassword}
                  />
                  <span
                    className="red-text"
                    style={{ fontSize: 12, color: "red", fontWeight: "bold" }}
                  >
                    {this.state.confirmPasswordError}
                  </span>
                </Form.Field>
                {hospital}
                {lab}
                <Button fluid type="button" icon={this.state.hidden ? 'eye' : 'eye slash'} onClick={this.toggleShow} content="Click to see password"/>
                <span
                    style={{ fontSize: 12, color: "white", fontWeight: "bold" }}
                >""</span>
                <Button fluid type="submit">
                  Register
                </Button>
              </Form>
            </Segment>
            <Message attached="bottom" warning>
              <Icon name="help" />
              Already Registered?
              <Link as={NavLink} to="/Login">
                {" "}
                Login
              </Link>{" "}
              here instead
            </Message>
          </Grid.Column>
          <Grid.Column>
            <Message color="teal">
              <Message.Header>Setting up Account</Message.Header>
              <Message.List>
                <Message.Item>
                  Username is visible to others, so make sure it's your real
                  name.
                </Message.Item>
                <Message.Item>
                  Provide a valid work email which you check more often.
                </Message.Item>
                <Message.Item>Password must include</Message.Item>
              </Message.List>
            </Message>
            <Message color="teal">
              <Message.Header>Setting up Password</Message.Header>
              <Message.List>
                <Message.Item>
                  Password must consist of minimum 8 characters.
                </Message.Item>
                <Message.Item>
                  Password must include atleast one number.
                </Message.Item>
                <Message.Item>
                  Password must include one Capital Letter.
                </Message.Item>
              </Message.List>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, {
  registerUser,
  registerHospital,
  registerLab
})(withRouter(Signup));
