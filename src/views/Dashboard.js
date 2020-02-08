import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
        <div className="row">
          <h4>
            <b>hey there</b>

            <p>you are logged in</p>
          </h4>
          <button onClick={this.onLogoutClick}>logout</button>
        </div>
      </div>
    );
  }
}

Dashboard.protoTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
