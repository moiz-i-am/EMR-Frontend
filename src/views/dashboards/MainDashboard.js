import React, { Component } from "react";
import { Grid, Dropdown, Icon, Menu, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUserWithProfile } from "./../../actions/userDetailsAction";
import { logoutUser } from "../../actions/authActions";
import DashboardContainer from "../../components/dashboardContainers/DashboardContainer";
import ShowProfile from "../../components/dashboardContainers/ShowProfile";
import EditProfile from "../../components/dashboardContainers/EditProfile";

const trigger = (state, name) => (
  <span style={{ fontSize: 11 }}>
    <Header as="h7" color="teal" textAlign="center">
      <Image
        src="https://react.semantic-ui.com/images/wireframe/square-image.png"
        size="small"
        circular
      />
      {name}
    </Header>
  </span>
);

export class MainDashboard extends Component {
  state = {
    name: "",
    role: "",
    home: true,
    browse: false,
    editProfile: false,
    horizontalNameShow: "Appointments History"
  };

  addAppointments = () => {
    this.setState({
      home: !this.state.home,
      browse: false,
      editProfile: false,
      horizontalNameShow: "Appointments History"
    });
  };
  addProfile = () => {
    this.setState({
      browse: !this.state.browse,
      home: false,
      editProfile: false,
      horizontalNameShow: "Profile"
    });
  };
  editProfile = () => {
    this.setState({
      editProfile: !this.state.editProfile,
      home: false,
      browse: false,
      horizontalNameShow: "Edit Profile"
    });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    console.log(this.documentData);
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        role: this.documentData.user.role
      });
    } else {
      this.setState({
        role: ""
      });
    }
    this.props.dispatch(getUserWithProfile(this.props.match.params.id));
  }

  /////////////////////////////////////////////// for Patients dashboard start ////////////////////////////////////////////
  renderDashboardPatient = (users, activeItem) =>
    users.user ? (
      <Grid className="grid">
        <Grid.Column width={3}>
          {/* <SideBar username={this.state.name} /> */}
          {/* /////////////////////////////////////////////////////////////////////////////////////// */}

          <Menu vertical>
            <Menu.Item>
              <Link to="/">
                <h1 style={{ textAlign: "center" }}>HEALTH-E</h1>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Dropdown
                floating
                item
                trigger={trigger(this.state, users.user.name)}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="user"
                    text="View Profile"
                    onClick={() => this.addProfile()}
                  />
                  <Dropdown.Item
                    icon="edit"
                    text="Edit Profile"
                    onClick={() => this.editProfile()}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>

            <Menu.Item
              name="appointments"
              active={activeItem === "appointments"}
              onClick={() => this.addAppointments()}
            >
              Appointment History
            </Menu.Item>

            <Menu.Item
              name="prescriptions"
              active={activeItem === "prescriptions"}
              onClick={this.handleItemClick}
            >
              <Icon name="grid layout" />
              View Previous Prescriptions
            </Menu.Item>
            <Menu.Item
              name="labtests"
              active={activeItem === "labtests"}
              onClick={this.handleItemClick}
            >
              View Lab Test Results
            </Menu.Item>

            <Dropdown item text="More">
              <Dropdown.Menu>
                <Dropdown.Item icon="edit" text="Edit Profile" />
                <Dropdown.Item icon="globe" text="Choose Language" />
                <Dropdown.Item icon="settings" text="Account Settings" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu>

          {/* /////////////////////////////////////////////////////////////////////////////////////// */}
        </Grid.Column>
        <Grid.Column width={13}>
          <Grid.Row>
            <div style={{ marginBottom: "35px" }}>
              {/* <HorizontalBar /> */}
              {/* /////////////////////////////////////////////////////////////////////////////////////// */}
              <Menu size="huge">
                <Menu.Item
                  name={this.state.horizontalNameShow}
                  active={activeItem === "home"}
                />

                <Menu.Menu position="right">
                  <Dropdown item icon="bars">
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.onLogoutClick}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              </Menu>
              {/* /////////////////////////////////////////////////////////////////////////////////////// */}
            </div>
          </Grid.Row>
          <Grid.Row>
            {/* here containers which appears in dashboard i.e edit profile are used to render */}
            {this.state.home && <DashboardContainer />}
            {this.state.browse && <ShowProfile userData={users.user} />}
            {this.state.editProfile && <EditProfile userData={users.user} />}
          </Grid.Row>
        </Grid.Column>
      </Grid>
    ) : (
      <div>Access Denied</div>
    );
  /////////////////////////////////////////////// for Patients dashboard end ////////////////////////////////////////////

  /////////////////////////////////////////////// for Patients dashboard start ////////////////////////////////////////////
  renderDashboardDoctor = (users, activeItem) =>
    users.user ? (
      <Grid className="grid">
        <Grid.Column width={3}>
          {/* <SideBar username={this.state.name} /> */}
          {/* /////////////////////////////////////////////////////////////////////////////////////// */}

          <Menu vertical>
            <Menu.Item>
              <Link to="/">
                <h1 style={{ textAlign: "center" }}>HEALTH-E</h1>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Dropdown
                floating
                item
                trigger={trigger(this.state, users.user.name)}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="user"
                    text="View Profile"
                    onClick={() => this.addProfile()}
                  />
                  <Dropdown.Item
                    icon="edit"
                    text="Edit Profile"
                    onClick={() => this.editProfile()}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>

            <Menu.Item
              name="appointments"
              active={activeItem === "appointments"}
              onClick={() => this.addAppointments()}
            >
              Appointment History
            </Menu.Item>

            <Menu.Item
              name="prescriptions"
              active={activeItem === "prescriptions"}
              onClick={this.handleItemClick}
            >
              <Icon name="grid layout" />
              View Previous Prescriptions
            </Menu.Item>
            <Menu.Item
              name="labtests"
              active={activeItem === "labtests"}
              onClick={this.handleItemClick}
            >
              View Lab Test Results
            </Menu.Item>

            <Dropdown item text="More">
              <Dropdown.Menu>
                <Dropdown.Item icon="edit" text="Edit Profile" />
                <Dropdown.Item icon="globe" text="Choose Language" />
                <Dropdown.Item icon="settings" text="Account Settings" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu>

          {/* /////////////////////////////////////////////////////////////////////////////////////// */}
        </Grid.Column>
        <Grid.Column width={13}>
          <Grid.Row>
            <div style={{ marginBottom: "35px" }}>
              {/* <HorizontalBar /> */}
              {/* /////////////////////////////////////////////////////////////////////////////////////// */}
              <Menu size="huge">
                <Menu.Item
                  name={this.state.horizontalNameShow}
                  active={activeItem === "home"}
                />

                <Menu.Menu position="right">
                  <Dropdown item icon="bars">
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.onLogoutClick}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              </Menu>
              {/* /////////////////////////////////////////////////////////////////////////////////////// */}
            </div>
          </Grid.Row>
          <Grid.Row>
            {/* here containers which appears in dashboard i.e edit profile are used to render */}
            {this.state.home && <DashboardContainer />}
            {this.state.browse && <ShowProfile userData={users.user} />}
            {this.state.editProfile && <EditProfile userData={users.user} />}
          </Grid.Row>
        </Grid.Column>
      </Grid>
    ) : (
      <div>Access Denied</div>
    );
  /////////////////////////////////////////////// for Patients dashboard end ////////////////////////////////////////////

  render() {
    const { activeItem } = this.state;
    let users = this.props.user;
    console.log(this.props);
    if (this.state.role === "patient") {
      return <div>{this.renderDashboardPatient(users, activeItem)}</div>;
    } else if (this.state.role === "doctor") {
      return <div>{this.renderDashboardDoctor(users, activeItem)}</div>;
    } else if (this.state.role === "hospital") {
      return <div>{this.renderDashboardHospital(users, activeItem)}</div>;
    } else if (this.state.role === "lab") {
      return <div>{this.renderDashboardLab(users, activeItem)}</div>;
    } else {
      return <div>Access Denied</div>;
    }
  }
}

MainDashboard.protoTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    logoutUser: history => dispatch(logoutUser(history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainDashboard));