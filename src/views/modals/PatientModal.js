import React, { Component } from 'react';
import { Modal, ModalHeader, Form, Button } from 'semantic-ui-react';
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    registerUser,
    registerHospital,
    registerLab
  } from "../../actions/authActions";

class PatientModal extends Component {
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
          this.props.history.push("/dashboard");
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
        let patient, doctor, hospital, lab;

        if(this.state.role === 'hospital') {
            hospital = (
                <Modal>
                    <ModalHeader>Signup</ModalHeader>
                    <Form>
                    <Form.Field>
                        <label>Hospital Name</label>
                        <input 
                            placeholder="Hospital Name"
                            onChange={this.onChange}
                            value={this.state.OrName} />
                    </Form.Field>
                    <Form.Field>
                        <label>Hospital Location</label>
                        <input 
                            placeholder="Hospital Location"
                            onChange={this.onChange}
                            value={this.state.OrLocation} />
                    </Form.Field>
                    </Form>
                </Modal>
            );
        } else if(this.state.role === "lab") {
            lab =(
            <Modal>
                <ModalHeader>Signup</ModalHeader>
                <Form>
                <Form.Field>
                    <label>Lab Name</label>
                    <input 
                        placeholder="Lab Name"
                        onChange={this.onChange}
                        value={this.state.OrName} />
                </Form.Field>
                <Form.Field>
                    <label>Lab Location</label>
                    <input 
                        placeholder="Lab Location"
                        onChange={this.onChange}
                        value={this.state.OrLocation} />
                </Form.Field>
                </Form>
            </Modal>
            );
        }

        const { errors } = this.state;
        return (
            <Modal>
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input 
                        placeholder="Username"
                        onChange={this.onChange}
                        value={this.state.OrName}
                        error={errors.username}
                        className={classnames("login-input", {
                        invalid: errors.username})} />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input 
                        placeholder="Email"
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        className={classnames("login-input", {
                        invalid: errors.email})} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input 
                        placeholder="Password"
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        className={classnames("login-input", {
                        invalid: errors.password})} />
                </Form.Field>
                {hospital}
                {lab}
                <Button type="submit">Register</Button>
            </Form>
            </Modal>
        );
    }
}

PatientModal.propTypes = {
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
  })(withRouter(PatientModal));