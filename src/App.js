import React, { Component } from "react";

import Footer from "./components/footer";
import { withRouter } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

let id = "";
const documentData = JSON.parse(localStorage.getItem("jwtToken"));
if (localStorage.getItem("jwtToken")) {
  id = documentData.user.id;
} else {
  id = "";
}
const exclusionArray = [`/dashboard/${id}`];

class App extends Component {
  state = {
    navbarOpen: false
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  render() {
    return (
      <div>
        {exclusionArray.indexOf(this.props.location.pathname) < 0 && (
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
        )}

        <main>{this.props.children}</main>

        {exclusionArray.indexOf(this.props.location.pathname) < 0 && <Footer />}
      </div>
    );
  }
}

export default withRouter(App);
