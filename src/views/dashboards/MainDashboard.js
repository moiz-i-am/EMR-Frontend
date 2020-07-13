import React, { Component } from "react";
import {
  Grid,
  Dropdown,
  Icon,
  Menu,
  Header,
  Segment,
  Responsive
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { getUserWithProfile } from "./../../actions/userDetailsAction";
import { logoutUser } from "../../actions/authActions";

import DashboardContainer from "../../components/dashboardContainers/DashboardContainer";
import ShowProfile from "../../components/dashboardContainers/ShowProfile";
import EditProfile from "../../components/dashboardContainers/EditProfile";
import EditProfilePatient from "../../components/dashboardContainers/editProfiles/EditProfilePatients";

import BookingPatient from "../../components/dashboardContainers/bookingsList/bookingPatient";
import BookingDoctor from "../../components/dashboardContainers/bookingsList/bookingDoctor";

import PrescriptionPatient from "../../components/dashboardContainers/prescriptions/PrescriptionLists/PrescriptionPatient";
import PrescriptionDoctor from "../../components/dashboardContainers/prescriptions/PrescriptionLists/PrescriptionDoctor";

import ShowProfileLab from "../../components/dashboardContainers/LabContainers/ShowProfileLab";
import EditProfileLab from "../../components/dashboardContainers/LabContainers/EditProfileLab";
import PatientsListLab from "../../components/dashboardContainers/LabContainers/PatientsListLab";
import UploadedTestsList from "../../components/dashboardContainers/LabContainers/UploadedTestsList";

import LabTestsList from "../../components/dashboardContainers/PatientContainers/LabTestsList";

import Logo from "../../assets/Logo.png";

import Image from "../../components/profilePicture/Image";

const trigger = (state, name, image) => (
  <span style={{ fontSize: 11 }}>
    <Header as="h7" color="teal" textAlign="center">
      <Grid>
        <Grid.Column width={6}>
          <Image contain fileURL={image} />
        </Grid.Column>
        <Grid.Column width={8}>{name}</Grid.Column>
      </Grid>
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
    presctiptionList: false,
    showLabProfile: false,
    editLabProfile: false,
    uploadLabTests: true,
    showUploadedResults: false,
    horizontalNameShow: "Appointments History",
    image: ""
  };

  addAppointments = () => {
    this.setState({
      home: !this.state.home,
      browse: false,
      editProfile: false,
      presctiptionList: false,
      showUploadedResults: false,
      horizontalNameShow: "Appointments History"
    });
  };
  addProfile = () => {
    this.setState({
      browse: !this.state.browse,
      home: false,
      editProfile: false,
      presctiptionList: false,
      horizontalNameShow: "Profile"
    });
  };
  editProfile = () => {
    this.setState({
      editProfile: !this.state.editProfile,
      home: false,
      browse: false,
      presctiptionList: false,
      horizontalNameShow: "Edit Profile"
    });
  };

  addProfilePatient = () => {
    this.setState({
      browse: !this.state.browse,
      home: false,
      editProfile: false,
      presctiptionList: false,
      showUploadedResults: false,
      horizontalNameShow: "Profile"
    });
  };
  editProfilePatient = () => {
    this.setState({
      editProfile: !this.state.editProfile,
      home: false,
      browse: false,
      presctiptionList: false,
      showUploadedResults: false,
      horizontalNameShow: "Edit Profile"
    });
  };

  prescriptionList = () => {
    this.setState({
      presctiptionList: !this.state.presctiptionList,
      home: false,
      browse: false,
      editProfile: false,
      showUploadedResults: false,
      horizontalNameShow: "Prescriptions"
    });
  };

  labTestResults = () => {
    this.setState({
      showUploadedResults: !this.state.showUploadedResults,
      home: false,
      browse: false,
      editProfile: false,
      presctiptionList: false,
      horizontalNameShow: "Prescriptions"
    });
  };

  ////////////////////////////// for lab onClicks start ////////////////////////////////////

  addProfileLab = () => {
    this.setState({
      showLabProfile: !this.state.showLabProfile,
      editLabProfile: false,
      uploadLabTests: false,
      showUploadedResults: false,
      horizontalNameShow: "Profile"
    });
  };
  editProfileLab = () => {
    this.setState({
      editLabProfile: !this.state.editLabProfile,
      showLabProfile: false,
      uploadLabTests: false,
      showUploadedResults: false,
      horizontalNameShow: "Edit Profile"
    });
  };

  uploadLabTests = () => {
    this.setState({
      uploadLabTests: !this.state.uploadLabTests,
      showLabProfile: false,
      editLabProfile: false,
      showUploadedResults: false,
      horizontalNameShow: "Upload test results"
    });
  };

  uploadedTests = () => {
    this.setState({
      showUploadedResults: !this.state.showUploadedResults,
      showLabProfile: false,
      editLabProfile: false,
      uploadLabTests: false,
      horizontalNameShow: "Upload test results"
    });
  };

  ////////////////////////////// for lab onClicks end ////////////////////////////////////

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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

    const userId = this.props.match.params.id;

    axios
      .get(`/v1/uploading/profilePicture/${userId}`)
      .then(res => {
        console.log(res.data.post);
        this.setState({
          image: "http://localhost:3001/" + res.data.post.imageURL
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  /////////////////////////////////////////////// for Patients dashboard start ////////////////////////////////////////////
  renderDashboardPatient = (users, activeItem) =>
    users.user ? (
      <Grid className="grid">
        <Grid.Column width={3}>
          {/* <SideBar username={this.state.name} /> */}
          {/* /////////////////////////////////////////////////////////////////////////////////////// */}

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
                height: "100%"
              }}
            >
              <Menu.Item>
                <Link to="/">
                  <Image src={Logo} />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Image contain fileURL={this.state.image} />
              </Menu.Item>
              <Menu.Item
                style={{ height: "10%" }}
                onClick={() => this.addProfilePatient()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="user"
                  size="large"
                />
              </Menu.Item>
              <Menu.Item
                style={{ height: "10%" }}
                onClick={() => this.editProfilePatient()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="edit"
                  size="large"
                />
              </Menu.Item>

              <Menu.Item
                style={{ height: "10%" }}
                icon="history"
                active={activeItem === "appointments"}
                onClick={() => this.addAppointments()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="history"
                  size="large"
                />
              </Menu.Item>

              <Menu.Item
                style={{ height: "10%" }}
                active={activeItem === "prescriptions"}
                onClick={() => this.prescriptionList()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="sticky note outline"
                  size="large"
                />
              </Menu.Item>
              <Menu.Item
                style={{ height: "10%" }}
                active={activeItem === "labtests"}
                onClick={() => this.labTestResults()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="lab"
                  size="large"
                />
              </Menu.Item>

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
                height: "100%"
              }}
            >
              <Menu.Item>
                <Link to="/">
                  <h1 style={{ textAlign: "center" }}>HEALTH-E</h1>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Dropdown
                  floating
                  item
                  trigger={trigger(
                    this.state,
                    users.user.name,
                    this.state.image
                  )}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon="user"
                      text="View Profile"
                      onClick={() => this.addProfilePatient()}
                    />
                    <Dropdown.Item
                      icon="edit"
                      text="Edit Profile"
                      onClick={() => this.editProfilePatient()}
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
                onClick={() => this.prescriptionList()}
              >
                <Icon name="grid layout" />
                View Previous Prescriptions
              </Menu.Item>
              <Menu.Item
                name="labtests"
                active={activeItem === "labtests"}
                onClick={() => this.labTestResults()}
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
          </Responsive>

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
            <Segment
              style={{ overflow: "auto", maxHeight: 572, minHeight: 572 }}
            >
              {/* here containers which appears in dashboard i.e edit profile are used to render */}
              {this.state.home && (
                <BookingPatient id={this.props.match.params.id} />
              )}
              {this.state.browse && (
                <ShowProfile
                  userData={users.user}
                  id={this.props.match.params.id}
                />
              )}
              {this.state.editProfile && (
                <EditProfilePatient userData={users.user} />
              )}
              {this.state.presctiptionList && (
                <PrescriptionPatient id={this.props.match.params.id} />
              )}
              {this.state.showUploadedResults && (
                <LabTestsList id={this.props.match.params.id} />
              )}
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    ) : (
      <div>Access Denied</div>
    );
  /////////////////////////////////////////////// for Patients dashboard end ////////////////////////////////////////////

  /////////////////////////////////////////////// for Doctors dashboard start ////////////////////////////////////////////
  renderDashboardDoctor = (users, activeItem) =>
    users.user ? (
      <Grid className="grid">
        <Grid.Column width={3}>
          {/* <SideBar username={this.state.name} /> */}
          {/* /////////////////////////////////////////////////////////////////////////////////////// */}

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
                height: "100%"
              }}
            >
              <Menu.Item>
                <Link to="/">
                  <Image src={Logo} />
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Image contain fileURL={this.state.image} />
              </Menu.Item>
              <Menu.Item
                style={{ height: "10%" }}
                onClick={() => this.addProfile()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="user"
                  size="large"
                />
              </Menu.Item>
              <Menu.Item
                style={{ height: "10%" }}
                onClick={() => this.editProfile()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="edit"
                  size="large"
                />
              </Menu.Item>

              <Menu.Item
                style={{ height: "10%" }}
                icon="history"
                active={activeItem === "appointments"}
                onClick={() => this.addAppointments()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="history"
                  size="large"
                />
              </Menu.Item>

              <Menu.Item
                style={{ height: "10%" }}
                active={activeItem === "prescriptions"}
                onClick={() => this.prescriptionList()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="sticky note outline"
                  size="large"
                />
              </Menu.Item>
              <Menu.Item
                style={{ height: "10%" }}
                active={activeItem === "labtests"}
                onClick={this.handleItemClick}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="lab"
                  size="large"
                />
              </Menu.Item>

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
                height: "100%"
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
                  trigger={trigger(
                    this.state,
                    users.user.name,
                    this.state.image
                  )}
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
                onClick={() => this.prescriptionList()}
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
          </Responsive>
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
            <Segment
              style={{ overflow: "auto", maxHeight: 572, minHeight: 572 }}
            >
              {/* here containers which appears in dashboard i.e edit profile are used to render */}
              {this.state.home && (
                <BookingDoctor id={this.props.match.params.id} />
              )}
              {this.state.browse && <ShowProfile userData={users.user} />}
              {this.state.editProfile && <EditProfile userData={users.user} />}
              {this.state.presctiptionList && (
                <PrescriptionDoctor id={this.props.match.params.id} />
              )}
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    ) : (
      <div>Access Denied</div>
    );
  /////////////////////////////////////////////// for doctor dashboard end ////////////////////////////////////////////

  /////////////////////////////////////////////// for Lab dashboard start ////////////////////////////////////////////
  renderDashboardLab = (users, activeItem) =>
    users.user ? (
      <Grid className="grid">
        <Grid.Column width={3}>
          {/* <SideBar username={this.state.name} /> */}
          {/* /////////////////////////////////////////////////////////////////////////////////////// */}

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
                height: "100%"
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
                onClick={() => this.addProfileLab()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="user"
                  size="large"
                />
              </Menu.Item>
              <Menu.Item
                style={{ height: "10%" }}
                onClick={() => this.editProfileLab()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="edit"
                  size="large"
                />
              </Menu.Item>

              <Menu.Item
                style={{ height: "10%" }}
                active={activeItem === "prescriptions"}
                onClick={() => this.uploadLabTests()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="cloud upload"
                  size="large"
                />
              </Menu.Item>

              <Menu.Item
                style={{ height: "10%" }}
                active={activeItem === "labtests"}
                onClick={() => this.uploadedTests()}
              >
                <Icon
                  style={{ width: "100%", paddingTop: "10px" }}
                  name="lab"
                  size="large"
                />
              </Menu.Item>

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
                height: "100%"
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
                      onClick={() => this.addProfileLab()}
                    />
                    <Dropdown.Item
                      icon="edit"
                      text="Edit Profile"
                      onClick={() => this.editProfileLab()}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>

              <Menu.Item
                name="prescriptions"
                active={activeItem === "prescriptions"}
                onClick={() => this.uploadLabTests()}
              >
                <Icon name="grid layout" />
                upload Lab Tests
              </Menu.Item>
              <Menu.Item
                name="labtests"
                active={activeItem === "labtests"}
                onClick={() => this.uploadedTests()}
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
          </Responsive>
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
            <Segment
              style={{ overflow: "auto", maxHeight: 572, minHeight: 572 }}
            >
              {/* here containers which appears in dashboard i.e edit profile are used to render */}
              {this.state.uploadLabTests && (
                <PatientsListLab id={this.props.match.params.id} />
              )}
              {this.state.showUploadedResults && (
                <UploadedTestsList id={this.props.match.params.id} />
              )}
              {this.state.showLabProfile && (
                <ShowProfileLab userData={users.user} />
              )}
              {this.state.editLabProfile && (
                <EditProfileLab userData={users.user} />
              )}
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    ) : (
      <div>Access Denied</div>
    );
  /////////////////////////////////////////////// for Lab dashboard end ////////////////////////////////////////////

  render() {
    const { activeItem } = this.state;
    let users = this.props.user;
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
