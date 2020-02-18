import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/headerStyle.css";
import SignupImage from "../assets/signin-ico.png";

export class header extends Component {
  render() {
    return (
      <header className="header-main" style={{ paddingBottom: "30px" }}>
        <div className="logo">
          <div style={{ marginRight: "200px" }}>
            <h2 style={{ margin: "0" }}>
              <Link to="/">HEALTH-E</Link>
            </h2>
          </div>
        </div>
        <div className="nav-links">
          <div style={{ marginRight: "130px" }}>
            <Link to="/listDoctors" style={{ marginBottom: "3px" }}>
              <h3
                style={{
                  width: "120px",
                  marginRight: "30px",
                  marginTop: "0",
                  marginBottom: "0",
                  float: "left"
                }}
              >
                Find Doctors
              </h3>
            </Link>
            <Link to="/" style={{ marginBottom: "3px" }}>
              <h3
                style={{
                  width: "120px",
                  marginRight: "30px",
                  marginTop: "0",
                  marginBottom: "0",
                  float: "left"
                }}
              >
                Find Hospitals
              </h3>
            </Link>
            <Link to="/SignupSelector">
              <img src={SignupImage} alt="signin" />
            </Link>
          </div>
        </div>
        <div className="circle-img"></div>
      </header>
    );
  }
}

export default header;
