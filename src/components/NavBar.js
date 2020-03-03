import React, { Component } from "react";
import _ from "lodash";
import {
  Menu,
  Dropdown,
  Button,
  Image,
  SidebarPushable,
  Sidebar,
  SidebarPusher,
  Icon,
  Container,
  Responsive
} from "semantic-ui-react";

import { Link } from "react-router-dom";

const MobileNavBar = ({
  children,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
  <SidebarPushable>
    <Sidebar
      as={Menu}
      animation="push"
      icon="labeled"
      items={rightItems}
      vertical
      direction="top"
      width="thin"
      visible={visible}
    >
      <Link to="/Login">
        <Menu.Item>HEALTH-E</Menu.Item>
      </Link>
      <Link to="/Login">
        <Menu.Item as="a">
          <Icon name="doctor" />
          Find Doctors
        </Menu.Item>
      </Link>
      <Menu.Item as="a">
        <Icon name="hospital" />
        Find Hospitals
      </Menu.Item>
      <Link to="/Login">
        <Menu.Item as="a">
          <Icon name="sign-in" />
          Login
        </Menu.Item>
      </Link>
      <Link to="/SignupSelector">
        <Menu.Item as="a">
          <Icon name="signup" />
          Signup
        </Menu.Item>
      </Link>
    </Sidebar>

    <SidebarPusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "80vh" }}
    >
      <Menu fixed="top" className="navbar" inverted>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Item className="head" header content="HEALTH-E" />
      </Menu>

      {children}
    </SidebarPusher>
  </SidebarPushable>
);

const NavBarDesktop = ({ rightItems }) => (
  <Menu fixed="top" className="navbar" borderless mini inverted>
    <Link to="/">
      <Menu.Item className="head" content="HEALTH-E" />
    </Link>

    <Menu.Menu className="right" position="right">
      <Link to="/listDoctors">
        <Menu.Item as="a" content="Find Doctors" />
      </Link>

      <Link to="">
        <Menu.Item as="a" content="Find Hospitals" />
      </Link>
      <Link to="/Login">
        <Menu.Item as="a" content="Login" />
      </Link>
      <Link to="/SignupSelector">
        <Menu.Item as="a" content="Signup" />
      </Link>
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ paddingTop: "5em" }}>{children}</Container>
);

const trigger = (
  <Menu.Item>
    <Image
      size="mini"
      avatar
      src={"https://randomuser.me/api/portraits/men/84.jpg"}
    />
  </Menu.Item>
);

const options = [
  { key: "user", text: "Account", icon: "user" },
  { key: "settings", text: "Settings", icon: "settings" },
  { key: "sign-out", text: "Sign Out", icon: "sign out" }
];

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { role: null, visiblity: true };
  }

  handlePusher = () => {
    const { visible } = this.state;
    if (visible) this.setState({ visible: false });
  };

  handlePusher = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, rightItems } = this.props;
    const { visible } = this.state;
    const role = this.state.role;
    let buttons;
    let rightMenu;

    if (role === "patient") {
      buttons = (
        <Menu.Item>
          <Menu.Item name="Appointments" />
          <Menu.Item name="Prescriptions" />
        </Menu.Item>
      );

      rightMenu = (
        <Menu.Menu position="right">
          <Dropdown
            trigger={trigger}
            options={options}
            pointing="top left"
            icon={null}
          />

          <Menu.Item>
            <Button as="a" primary content="Logout" />
          </Menu.Item>
        </Menu.Menu>
      );
    } else if (role === null) {
      rightMenu = (
        <Menu.Menu className="right" position="right">
          <Link to="/listDoctors">
            <Menu.Item>
              <Button as="a" primary content="Find Doctors" />
            </Menu.Item>
          </Link>
          <Link to="">
            <Menu.Item>
              <Button as="a" primary content="Find Hospitals" />
            </Menu.Item>
          </Link>
          <Link to="/Login">
            <Menu.Item>
              <Button as="a" primary content="Login" />
            </Menu.Item>
          </Link>
          <Link to="/SignupSelector">
            <Menu.Item>
              <Button as="a" primary content="Signup" />
            </Menu.Item>
          </Link>
        </Menu.Menu>
      );
    }
    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <MobileNavBar
            rightItems={rightItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </MobileNavBar>
        </Responsive>

        {/* <Menu className="navbar" borderless size="mini" inverted fixed="top"> */}
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
        {/* </Menu> */}
      </div>
    );
  }
}

export default NavBar;
