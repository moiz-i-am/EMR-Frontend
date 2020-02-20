import React, { Component } from "react";
import ProfileCards from "./DoctorsProfileCards";

class DoctorsList extends Component {
  render() {
    return (
      <div style={{ width: "70%" }}>
        <ProfileCards />
      </div>
    );
  }
}

export default DoctorsList;
