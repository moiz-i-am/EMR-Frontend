import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { Dropdown, Icon } from "semantic-ui-react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Brand from "./Brand";
import BurgerMenu from "./BurgerMenu";
import CollapseMenu from "./CollapseMenu";

import Image from "../profilePicture/Image";

const trigger = name => (
  <span>
    <Icon name="user" /> {name}
    {/* <Image contain fileURL={image} /> {name} */}
  </span>
);

const onDashboardClick = (props, user) => {
  props.history.push(`/dashboard/${user}`);
};

const onSignout = props => {
  props.logoutUser(props.history);
};

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

  // const localData = JSON.parse(localStorage.getItem("jwtToken"));
  // const [userdata, setUserdata] = useState(localData);

  // const [state, setState] = useState({ image: "" });

  // useEffect(() => {
  //   const userId = userdata.user.id;
  //   axios
  //     .get(`/v1/uploading/profilePicture/${userId}`)
  //     .then(res => {
  //       console.log(res.data.post);
  //       setState({ image: "http://localhost:3001/" + res.data.post.imageURL });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  const { isAuthenticated, user } = props.auth;
  const authLinks = (
    <div>
      <Link to="/listDoctors">Find Doctors</Link>
      <Link to="/listHospitals">Hospitals</Link>
      <Link to="/listLabs">Labs</Link>
      {/* <Dropdown trigger={trigger(user.name)} options={options(user.name)} /> */}

      <Drop trigger={trigger(user.name)}>
        <Dropdown.Menu>
          <Dropdown.Item text={`Signed in as ${user.name}`} disabled={true} />
          <Dropdown.Divider />
          <Dropdown.Item
            text="Your Dashboard"
            onClick={() => onDashboardClick(props, user.id)}
          />
          <Dropdown.Item text="Sign Out" onClick={() => onSignout(props)} />
        </Dropdown.Menu>
      </Drop>
    </div>
  );

  const guestLinks = (
    <div>
      <Link to="/listDoctors">Doctors</Link>
      <Link to="/listHospitals">Hospitals</Link>
      <Link to="/listLabs">Labs</Link>
      <Link to="/Login">Login</Link>
      <Link to="/SignupSelector">Signup</Link>
    </div>
  );

  return (
    <div>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand />
          <NavLinks style={linkAnimation}>
            {isAuthenticated ? authLinks : guestLinks}
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

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));

const NavBar = styled(animated.nav)`
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  height: 85px;
  background: #fff;
  box-shadow: 10px 10px 15px #aaaaaa;
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
    color: #123562;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #9458ae;
      border-bottom: 1px solid #9458ae;
    }

    @media (max-width: 1089px) {
      display: none;
    }
  }
`;

const Drop = styled(Dropdown)`
    @media (max-width: 1089px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 1090px) {
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
