import React, { Component } from "react";
import {
  Grid,
  Dropdown,
  Icon,
  Menu,
  Header,
  Responsive,
  Segment,
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUserWithProfile } from "../../actions/userDetailsAction";

import { logoutUser } from "../../actions/authActions";

import NewRegistrations from "./Containers/NewRegistrations";
import ShowProfile from "../../components/dashboardContainers/PatientContainers/ShowProfilePatient";
import EditProfilePatient from "../../components/dashboardContainers/PatientContainers/EditProfilePatients";
import DoctorsList from "./Containers/PaymentsViewer/DoctorsList";

import Logo from "../../assets/Logo.png";

const trigger = (state, name) => (
  <span style={{ fontSize: 11 }}>
    <Header as="h2" color="teal" textAlign="center">
      {name}
    </Header>
  </span>
);

class AdminDashboard extends Component {
  state = {
    name: "",
    role: "",
    home: true,
    browse: false,
    editProfile: false,
    payments: false,
    horizontalNameShow: "Approve new users"
  };

  handleApproveUsers = () => {
    this.setState({
      home: !this.state.home,
      browse: false,
      editProfile: false,
      payments: false,
      horizontalNameShow: "Approve new users"
    });
  };
  handleShowPayments = () => {
    this.setState({
      payments: !this.state.payments,
      home: false,
      browse: false,
      editProfile: false,
      horizontalNameShow: "see pending payments"
    });
  };
  addProfileAdmin = () => {
    this.setState({
      browse: !this.state.browse,
      home: false,
      editProfile: false,
      payments: false,
      horizontalNameShow: "Profile"
    });
  };
  editProfileAdmin = () => {
    this.setState({
      editProfile: !this.state.editProfile,
      home: false,
      browse: false,
      payments: false,
      horizontalNameShow: "Edit Profile"
    });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
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

  renderDashboardAdmin = (users, activeItem) =>
    users.user ? (
      <Grid className="grid">
        <Grid.Column width={3}>
          {/* <SideBar username={this.state.name} /> */}
          {/* /////////////////////////////////////////////////////////////////////////////////////// */}

          {/* <Segment.Group> */}
          <Responsive
            maxWidth={1090}
            style={{
              width: "105%",
              height: "100%"
            }}
          >
            <Menu
              vertical
              inverted
              style={{
                backgroundColor: "#2C3436",
                width: "105%",
                height: "102.2%"
              }}
            >
              <Menu.Item>
                <Link to="/">
                  <Image src={Logo} />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Image
                  src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                  size="small"
                  circular
                />
              </Menu.Item>
              <Menu.Item
                style={{ height: "10%" }}
                onClick={() => this.addProfileAdmin()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="user"
                  size="large"
                />
              </Menu.Item>
              <Menu.Item
                style={{ height: "10%" }}
                onClick={() => this.editProfileAdmin()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="edit"
                  size="large"
                />
              </Menu.Item>

              <Menu.Item
                style={{ height: "10%" }}
                icon="check circle"
                active={activeItem === "approve"}
                onClick={() => this.handleApproveUsers()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="check circle"
                  size="large"
                />
              </Menu.Item>

              <Menu.Item
                style={{ height: "10%" }}
                active={activeItem === "payments"}
                onClick={() => this.handleShowPayments()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="payment"
                  size="large"
                />
              </Menu.Item>
              {/* <Menu.Item
                style={{ height: "10%" }}
                active={activeItem === "labtests"}
                onClick={this.handleItemClick}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="lab"
                  size="large"
                />
              </Menu.Item> */}

              <Dropdown item text="More">
                <Dropdown.Menu>
                  <Dropdown.Item icon="edit" text="Edit Profile" />
                  <Dropdown.Item icon="globe" text="Choose Language" />
                  <Dropdown.Item icon="settings" text="Account Settings" />
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </Responsive>

          <Responsive
            minWidth={1091}
            style={{
              width: "105%",
              height: "100%"
            }}
          >
            <Menu
              vertical
              inverted
              style={{
                backgroundColor: "#2C3436",
                width: "105%",
                height: "102.2%"
              }}
            >
              <Menu.Item>
                <Link to="/">
                  <h1 style={{ textAlign: "center", color: "white" }}>
                    HEALTH-<span style={{ color: "red" }}>E</span>
                  </h1>
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
                      onClick={() => this.addProfileAdmin()}
                    />
                    <Dropdown.Item
                      icon="edit"
                      text="Edit Profile"
                      onClick={() => this.editProfileAdmin()}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>

              <Menu.Item
                name="approve"
                active={activeItem === "approve"}
                onClick={() => this.handleApproveUsers()}
              >
                Approve new users
              </Menu.Item>

              <Menu.Item
                name="payments"
                active={activeItem === "payments"}
                onClick={() => this.handleShowPayments()}
              >
                <Icon name="grid layout" />
                Show payments
              </Menu.Item>
              {/* <Menu.Item
                name="labtests"
                active={activeItem === "labtests"}
                onClick={this.handleItemClick}
              >
                View Lab Test Results
              </Menu.Item> */}

              <Dropdown item text="More">
                <Dropdown.Menu>
                  <Dropdown.Item icon="edit" text="Edit Profile" />
                  <Dropdown.Item icon="globe" text="Choose Language" />
                  <Dropdown.Item icon="settings" text="Account Settings" />
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </Responsive>
          {/* </Segment.Group> */}
          {/* /////////////////////////////////////////////////////////////////////////////////////// */}
        </Grid.Column>
        <Grid.Column width={13}>
          <Grid.Row>
            <div style={{ marginBottom: "35px" }}>
              {/* <HorizontalBar /> */}
              {/* /////////////////////////////////////////////////////////////////////////////////////// */}
              <Menu size="huge" inverted style={{ backgroundColor: "#2C3436" }}>
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
            <Segment
              style={{ overflow: "auto", maxHeight: 572, minHeight: 572 }}
            >
              {/* here containers which appears in dashboard i.e edit profile are used to render */}
              {this.state.home && <NewRegistrations />}
              {this.state.payments && <DoctorsList />}
              {this.state.browse && <ShowProfile userData={users.user} />}
              {this.state.editProfile && (
                <EditProfilePatient userData={users.user} />
              )}
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    ) : (
      <div>Access Denied</div>
    );
  /////////////////////////////////////////////// for doctor dashboard end ////////////////////////////////////////////

  render() {
    const { activeItem } = this.state;
    let users = this.props.user;
    if (this.state.role === "admin") {
      return <div>{this.renderDashboardAdmin(users, activeItem)}</div>;
    } else {
      return <div>Access Denied</div>;
    }
  }
}

AdminDashboard.protoTypes = {
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
)(withRouter(AdminDashboard));
