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
            <Link to="/docProfile/:id" style={{ marginBottom: "3px" }}>
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

// conditional header with pic and logout button

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../actions/authActions";
// import { withRouter } from "react-router-dom";

// class header extends Component {
//   onLogout(e) {
//     e.preventDefault();
//     this.props.logoutUser(this.props.history);
//   }

//   render() {
//     const { isAuthenticated, user } = this.props.auth;
//     const authLinks = (
//       <ul className="navbar-nav ml-auto">
//         <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
//           <img
//             src={user.avatar}
//             alt={user.name}
//             title={user.name}
//             className="rounded-circle"
//             style={{ width: "25px", marginRight: "5px" }}
//           />
//           Logout
//         </a>
//       </ul>
//     );
//     const guestLinks = (
//       <ul className="navbar-nav ml-auto">
//         <li className="nav-item">
//           <Link className="nav-link" to="/signup">
//             Sign Up
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/login">
//             Sign In
//           </Link>
//         </li>
//       </ul>
//     );
//     return (
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <Link className="navbar-brand" to="/">
//           Redux Node Auth
//         </Link>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           {isAuthenticated ? authLinks : guestLinks}
//         </div>
//       </nav>
//     );
//   }
// }
// header.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps, { logoutUser })(withRouter(header));
