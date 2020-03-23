import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Input,
  Image,
  Card,
  Button,
  Label,
  Icon,
  Confirm,
  Message,
  Divider
} from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, Calendar } from "react-date-range";

import Select from "react-select";
import { timeOptions } from "../../data/data";

import {
  updateUserData,
  deleteUser,
  createDoctorsSchedule
} from "./../../actions/userDetailsAction";
import { deleteDoctorsSchedule } from "../../actions/schedulingActions";
import { withRouter } from "react-router-dom";

// const localizer = momentLocalizer(moment);
// const DnDCalendar = withDragAndDrop(Calendar);

let current_datetime = new Date();
let formatted_date =
  current_datetime.getDate() +
  "-" +
  (current_datetime.getMonth() + 1) +
  "-" +
  current_datetime.getFullYear();

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      id: "",
      name: "",
      email: "",
      phone: this.props.userData.phone,
      location_city: this.props.userData.location_city,
      location_state: this.props.userData.location_state,
      location_country: this.props.userData.location_country,
      discription: "",
      selectedHospitals: [],
      selectedSpecializations: [],
      selectedPrevSpecializations: this.props.userData.specializations,
      open: false,
      open2: false,
      open3: false,
      open4: false,
      userData: this.props.userData,
      val: "",
      selectionRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
      },
      todayDate: new Date(),
      selectedDateForDelete: ""
    };
  }

  componentDidUpdate(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken,
        id: this.documentData.user.id,
        name: this.documentData.user.name
      });
    } else {
      this.setState({
        token: "",
        id: ""
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  show = () => this.setState({ open: true });
  show2 = () => this.setState({ open2: true });
  show3 = () => this.setState({ open3: true });
  show4 = () => this.setState({ open4: true });

  handleConfirm = () => {
    this.setState({ open: false });
    if (this.props.auth.isAuthenticated) {
      this.props.deleteUser(
        // change id to (this.props.match.params.id)
        this.state.id,
        this.state.token
      );
      this.props.auth.isAuthenticated = false;
      localStorage.removeItem("jwtToken");
      this.props.history.push("/");
    } else {
      console.log("asdasdasd");
    }
  };

  handleConfirmSchedule = () => this.setState({ open2: false });

  handleConfirmDeleteSchedule = () => {
    this.setState({ open3: false });
    const docData = {
      user: this.state.id,
      date: this.state.selectedDateForDelete
    };
    this.props.deleteDoctorsSchedule(docData);
  };

  handleConfirmUpdateSchedule = () => this.setState({ open4: false });

  handleCancel = () => this.setState({ open: false });
  handleCancelSchedule = () => this.setState({ open2: false });
  handleCancelDeleteSchedule = () => this.setState({ open3: false });
  handleCancelUpdateSchedule = () => this.setState({ open4: false });

  onSubmit = e => {
    e.preventDefault();

    const upUserData = {
      name: this.state.name,
      phone: this.state.phone,
      location_city: this.state.location_city,
      location_state: this.state.location_state,
      location_country: this.state.location_country,
      /// join both prev and new specs
      // specializations: [
      //   this.state.selectedPrevSpecializations +
      //     this.state.selectedSpecializations
      // ]
      specializations: this.state.selectedSpecializations
    };
    const addScheduleData = {
      startDate: this.state.selectionRange.startDate,
      endDate: this.state.selectionRange.endDate,
      timeSlots: this.state.val
    };
    if (this.state.todayDate >= this.state.selectionRange.startDate) {
      alert(`please select the date onward ${formatted_date}`);
    } else if (this.props.auth.isAuthenticated) {
      this.props.updateUserData(
        upUserData,
        this.props.history,
        // change id to (this.props.match.params.id)
        this.state.id,
        this.state.token
      );
      this.props.createDoctorsSchedule(
        addScheduleData,
        this.props.history,
        // change id to (this.props.match.params.id)
        this.state.id,
        this.state.token
      );
    } else {
      console.log("not logged in");
    }
  };

  handleChange(e, index) {
    this.state.selectedHospitals[index] = e.target.value;
    this.setState({ selectedHospitals: this.state.selectedHospitals });
  }
  handleRevove(index) {
    // remove the field
    this.state.selectedHospitals.splice(index, 1);
    //update the state
    this.setState({ selectedHospitals: this.state.selectedHospitals });
  }

  handleChangeSpecialization(e, index) {
    this.state.selectedSpecializations[index] = e.target.value;
    this.setState({
      selectedSpecializations: this.state.selectedSpecializations
    });
  }
  handleRevoveSpecialization(index) {
    // remove the field
    this.state.selectedSpecializations.splice(index, 1);

    this.setState({
      selectedSpecializations: this.state.selectedSpecializations
    });
  }

  handleChangePrevSpecialization(e, index) {
    this.state.selectedPrevSpecializations[index] = e.target.value;
    this.setState({
      selectedPrevSpecializations: this.state.selectedPrevSpecializations
    });
  }

  handleRevovePreviousSpecialization(index) {
    // remove the field
    this.state.selectedPrevSpecializations.splice(index, 1);

    this.setState({
      selectedPrevSpecializations: this.state.selectedPrevSpecializations
    });
  }

  addHospital() {
    this.setState({ selectedHospitals: [...this.state.selectedHospitals, ""] });
  }

  addSpecialization() {
    this.setState({
      selectedSpecializations: [...this.state.selectedSpecializations, ""]
    });
  }

  onSelected = value => {
    this.setState({ val: value });
  };

  handleSelect = ranges => {
    this.setState({ selectionRange: ranges.selection });
  };

  handleSelectSingle = date => {
    const localTime = moment(date).format("YYYY-MM-DD"); // store localTime
    const proposedDate = localTime + "T19:00:00.000Z";
    this.setState({ selectedDateForDelete: proposedDate });
  };

  renderSchedule() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }}>
            <DateRangePicker
              ranges={[this.state.selectionRange]}
              onChange={this.handleSelect}
            />
          </div>
          <div style={{ flexGrow: "1" }}>
            <Select
              isMulti
              name="colors"
              options={timeOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.onSelected}
            />
          </div>
        </div>
      </div>
    );
  }

  renderDeleteSchedule() {
    return (
      <div style={{ textAlign: "center" }}>
        <Calendar date={new Date()} onChange={this.handleSelectSingle} />
      </div>
    );
  }

  renderAlert() {
    return (
      <div>
        <Message color="red">Red</Message>;
      </div>
    );
  }

  render() {
    // console.log(
    //   "prev asdj: " +
    //     this.state.selectedPrevSpecializations +
    //     "," +
    //     this.state.selectedSpecializations
    // );

    console.log("user data: " + JSON.stringify(this.state.userData));
    return (
      <div className="main-view-profile-info">
        <Card fluid>
          <Card.Content>
            <Grid>
              <Grid.Column width={5}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                    size="small"
                    circular
                  />
                </div>
              </Grid.Column>

              <Grid.Column width={6}>
                <div
                  style={{
                    fontSize: "20px",
                    marginTop: "30px"
                  }}
                >
                  <Input
                    name="uname"
                    value={this.state.userData.name}
                    onChange={this.onChange}
                  />
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "normal",
                    marginTop: "15px",
                    color: "#37B6AD"
                  }}
                >
                  {this.state.userData.email}
                </div>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "normal",
                marginTop: "15px"
              }}
            >
              <span>Phone No.</span>
              <Input
                name="phone"
                value={this.state.phone}
                onChange={this.onChange}
              />
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "normal",
                marginTop: "15px"
              }}
            >
              <Grid>
                <Grid.Column width={5}>
                  city:{" "}
                  <Input
                    name="location_city"
                    value={this.state.location_city}
                    onChange={this.onChange}
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  state:{" "}
                  <Input
                    name="location_state"
                    value={this.state.location_state}
                    onChange={this.onChange}
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  country:{" "}
                  <Input
                    name="location_country"
                    value={this.state.location_country}
                    onChange={this.onChange}
                  />
                </Grid.Column>
              </Grid>
            </div>
          </Card.Content>
          <Card.Content>{this.state.discription}</Card.Content>
          <Card.Content>
            <div>
              <p>Serving Hospitals:</p>
              {this.state.selectedHospitals.map((hospitals, index) => {
                return (
                  <div key={index}>
                    <Input
                      value={hospitals}
                      onChange={e => this.handleChange(e, index)}
                    />
                    <Button
                      icon
                      onClick={() => this.handleRevove(index)}
                      color="red"
                    >
                      <Icon name="delete" />
                    </Button>
                  </div>
                );
              })}
              <Button
                as="div"
                labelPosition="right"
                onClick={e => this.addHospital(e)}
              >
                <Button icon color="green">
                  <Icon name="plus" />
                </Button>
                <Label as="a" basic pointing="left" color="green">
                  Add Hospital
                </Label>
              </Button>
            </div>
            <div>
              <p>Specialization:</p>
              {/* /////////////////////////////////////////////////////////////// */}
              {this.state.selectedPrevSpecializations.map(
                (prevSpecialization, index) => {
                  return (
                    <div key={index}>
                      <Input
                        value={prevSpecialization}
                        onChange={e =>
                          this.handleChangePrevSpecialization(e, index)
                        }
                      />
                      <Button
                        icon
                        onClick={() =>
                          this.handleRevovePreviousSpecialization(index)
                        }
                        color="red"
                      >
                        <Icon name="delete" />
                      </Button>
                    </div>
                  );
                }
              )}
              {/* ////////////////////////////////////////////////////////////// */}
              {this.state.selectedSpecializations.map(
                (specialization, index) => {
                  return (
                    <div key={index}>
                      <Input
                        value={specialization}
                        onChange={e =>
                          this.handleChangeSpecialization(e, index)
                        }
                      />
                      <Button
                        icon
                        onClick={() => this.handleRevoveSpecialization(index)}
                        color="red"
                      >
                        <Icon name="delete" />
                      </Button>
                    </div>
                  );
                }
              )}
              <Button
                as="div"
                labelPosition="right"
                onClick={e => this.addSpecialization(e)}
              >
                <Button icon color="green">
                  <Icon name="plus" />
                </Button>
                <Label as="a" basic pointing="left" color="green">
                  Add Specialization
                </Label>
              </Button>
            </div>
          </Card.Content>
          <Card.Content textAlign="right">
            <Button onClick={this.show2} color="green">
              new schedule
            </Button>
            <Confirm
              open={this.state.open2}
              content={this.renderSchedule()}
              header="Set time of your availability"
              onCancel={this.handleCancelSchedule}
              onConfirm={this.handleConfirmSchedule}
              size="large"
            />
            <Button onClick={this.show4} color="blue">
              Update schedule
            </Button>
            <Confirm
              open={this.state.open4}
              // content={this.renderUpdateSchedule()}
              header="select a date to update it's schedule"
              onCancel={this.handleCancelUpdateSchedule}
              onConfirm={this.handleConfirmUpdateSchedule}
              size="large"
            />
            <Button onClick={this.show3} color="red">
              delete schedule
            </Button>
            <Confirm
              open={this.state.open3}
              content={this.renderDeleteSchedule()}
              header="select a date to delete"
              onCancel={this.handleCancelDeleteSchedule}
              onConfirm={this.handleConfirmDeleteSchedule}
              size="small"
            />

            <Divider horizontal />
            <Button onClick={this.show} color="red">
              Delete Account
            </Button>
            <Confirm
              content="Are you sure you want to delete your profile?"
              open={this.state.open}
              header="Delete Alert"
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
            />
            <Button type="submit" color="blue" onClick={this.onSubmit}>
              Update
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
EditProfile.propTypes = {
  updateUserData: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    updateUserData: (user, history, id, token) =>
      dispatch(updateUserData(user, history, id, token)),
    deleteUser: (id, token) => dispatch(deleteUser(id, token)),
    createDoctorsSchedule: (user, history, id, token) =>
      dispatch(createDoctorsSchedule(user, history, id, token)),
    deleteDoctorsSchedule: docData => dispatch(deleteDoctorsSchedule(docData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
