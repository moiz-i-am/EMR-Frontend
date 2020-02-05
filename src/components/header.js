import React, { Component } from "react";
import { Link } from "react-router-dom";

export class header extends Component {
  render() {
    return (
      <header>
        <Link to="/">Home</Link>
        <Link to="/SignupSelector">Signup/Login</Link>
        <hr />
      </header>
    );
  }
}

export default header;
