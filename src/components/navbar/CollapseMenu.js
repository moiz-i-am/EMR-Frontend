import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

import { useSpring, animated } from "react-spring";

const trigger = name => (
  <span style={{ color: "#ffffff", fontSize: "20px" }}>
    <Icon name="user" /> {name}
  </span>
);

const onDashboardClick = (props, user) => {
  props.history.push(`/dashboard/${user}`);
};

const onSignout = props => {
  props.logoutUser(props.history);
};

const CollapseMenu = props => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  const { isAuthenticated, user } = props.auth;
  const authLinks = (
    <div>
      <li>
        <Link to="/listDoctors" onClick={props.handleNavbar}>
          Doctors
        </Link>
      </li>
      <li>
        <Link to="/" onClick={props.handleNavbar}>
          Hospitals
        </Link>
      </li>
      <li>
        <Link to="/" onClick={props.handleNavbar}>
          Labs
        </Link>
      </li>
      <li>
        <Dropdown
          trigger={trigger(user.name)}
          pointing="left"
          additionPosition="top"
        >
          <Dropdown.Menu>
            <Dropdown.Item text={`Signed in as ${user.name}`} disabled={true} />
            <Dropdown.Divider />
            <Dropdown.Item
              text="Your Dashboard"
              onClick={() => onDashboardClick(props, user.id)}
            />
            <Dropdown.Item text="Sign Out" onClick={() => onSignout(props)} />
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </div>
  );

  const guestLinks = (
    <div>
      <li>
        <Link to="/listDoctors" onClick={props.handleNavbar}>
          Doctors
        </Link>
      </li>
      <li>
        <Link to="/" onClick={props.handleNavbar}>
          Hospitals
        </Link>
      </li>
      <li>
        <Link to="/" onClick={props.handleNavbar}>
          labs
        </Link>
      </li>
      <li>
        <Link to="/Login" onClick={props.handleNavbar}>
          Login
        </Link>
      </li>
      <li>
        <Link to="/SignupSelector" onClick={props.handleNavbar}>
          Signup
        </Link>
      </li>
    </div>
  );

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200]
            })
            .interpolate(openValue => `translate3d(0, ${openValue}px, 0`)
        }}
      >
        <NavLinks>{isAuthenticated ? authLinks : guestLinks}</NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

CollapseMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  withRouter(CollapseMenu)
);

const CollapseWrapper = styled(animated.div)`
  background: transparent;
  position: relative;
  top: -1rem;
  left: 0;
  right: 0;
  marign-bottom: 30px;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;
  margin-bottom: 3rem;
  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: #123562;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #9458ae;
      border-bottom: 1px solid #9458ae;
    }
  }
`;
