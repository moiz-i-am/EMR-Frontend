import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { Link } from "react-router-dom";

import Brand from "./Brand";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";

const Navbar = props => {
  const barAnimation = useSpring({
    from: { transform: "translate3d(0, -10rem, 0)" },
    transform: "translate3d(0, 0, 0)"
  });

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly
  });

  return (
    <div>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand />
          <NavLinks style={linkAnimation}>
            <Link to="/listDoctors">Find Doctors</Link>
            <Link to="/">Dashboard</Link>
            <Link to="/Login">Login</Link>
            <Link to="/SignupSelector">Signup</Link>
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </div>
  );
};

export default Navbar;

const NavBar = styled(animated.nav)`
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  background: #2d3436;
  z-index: 2;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  height: 5rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

// // conditional header with pic and logout button

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
//           <Link className="nav-link" to="/SignupSelector">
//             Sign Up
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/Login">
//             Sign In
//           </Link>
//         </li>
//       </ul>
//     );
//     return (
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <Link className="navbar-brand" to="/">
//           Health-E
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
