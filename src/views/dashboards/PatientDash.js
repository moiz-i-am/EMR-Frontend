import React, { Component } from "react";
import { Grid, Dropdown, Icon, Menu, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "./../../actions/authActions";
import DashboardContainer from "../../components/dashboardContainers/DashboardContainer";
import ShowProfile from "../../components/dashboardContainers/ShowProfile";
import EditProfile from "../../components/dashboardContainers/EditProfile";
import userImg from "./../../assets/user-solid.svg";
import updateUserData from "../../actions/userDetailsAction";

const trigger = state => (
  <span style={{ fontSize: 11 }}>
    <Header as="h7" color="teal" textAlign="center">
      <Image
        src="https://react.semantic-ui.com/images/wireframe/square-image.png"
        size="small"
        circular
      />
      {state.name}
    </Header>
  </span>
);

class PatientDash extends Component {
  state = {
    name: "",
    home: true,
    browse: false,
    editProfile: false,
    horizontalNameShow: "Appointments History"
  };

  componentDidMount() {
    //this.props.dispatch(updateUserData(this.props.match.params.id));
  }

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
        name: this.documentData.user.name
      });
    } else {
      this.setState({
        name: ""
      });
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
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
              <Dropdown floating item trigger={trigger(this.state)}>
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
            {this.state.browse && <ShowProfile />}
            {this.state.editProfile && <EditProfile />}
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

PatientDash.protoTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(PatientDash);
