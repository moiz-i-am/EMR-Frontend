import React, { Component } from "react";
import { Link } from "react-router-dom";

export class header extends Component {
  render() {
    return (
      <header>
        <Link to="/">Home</Link>

        <hr />
      </header>
    );
  }
}

export default header;
