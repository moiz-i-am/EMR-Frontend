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
  Message
} from "semantic-ui-react";
import { connect } from "react-redux";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

import Select from "react-select";
import { timeOptions } from "../../data/data";

import {
  updateUserData,
  deleteUser,
  createDoctorsSchedule
} from "./../../actions/userDetailsAction";
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
  state = {
    token: "",
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    discription: "",
    hos1: "shifa",
    hos2: "city",
    hos3: "quaid e azam",
    spec1: "dermotoligist",
    spec2: "skin specialist",
    spec3: "pechus system",
    mornfrom: "8:00",
    mornto: "10:00",
    evefrom: "5:00",
    eveto: "9:00",
    selectedHospitals: [],
    selectedSpecializations: [],
    selectedPrevSpecializations: this.props.userData.specializations,
    open: false,
    open2: false,
    userData: this.props.userData,
    val: "",
    selectionRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    },
    todayDate: new Date()
  };

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
        name: this.documentData.user.name,
        email: this.documentData.user.email
      });
    } else {
      this.setState({
        token: "",
        id: "",
        name: "",
        email: "",
        phone: "03214568789",
        location: "wah cantt",
        discription: "",
        hos1: "shifa",
        hos2: "city",
        hos3: "quaid e azam",
        spec1: "dermotoligist",
        spec2: "skin specialist",
        spec3: "pechus system",
        mornfrom: "8:00",
        mornto: "10:00",
        evefrom: "5:00",
        eveto: "9:00"
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  show = () => this.setState({ open: true });
  show2 = () => this.setState({ open2: true });
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
  handleCancel = () => this.setState({ open: false });
  handleCancelSchedule = () => this.setState({ open2: false });

  handleConfirmSchedule = () => this.setState({ open2: false });

  onSubmit = e => {
    e.preventDefault();

    const upUserData = {
      name: this.state.name,
      phone: this.state.phone,
      /// join both prev and new specs
      specializations: [
        this.state.selectedPrevSpecializations +
          this.state.selectedSpecializations
      ]
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
    console.log(this.state.selectedHospitals, "8888");
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

  renderAlert() {
    return (
      <div>
        <Message color="red">Red</Message>;
      </div>
    );
  }

  render() {
    console.log(
      "prev asdj: " +
        this.state.selectedPrevSpecializations +
        "," +
        this.state.selectedSpecializations
    );
    console.log("new asdj: ");
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
                    fontSize: "15px",
                    fontWeight: "normal",
                    marginTop: "15px"
                  }}
                >
                  {this.state.email}
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
                value={this.state.userData.phone}
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
                  <Label basic color="blue">
                    <Input
                      name="city"
                      value={this.state.userData.location_city}
                      onChange={this.onChange}
                    />
                  </Label>
                </Grid.Column>
                <Grid.Column width={5}>
                  state:{" "}
                  <Label basic color="blue">
                    <Input
                      name="state"
                      value={this.state.userData.location_state}
                      onChange={this.onChange}
                    />
                  </Label>
                </Grid.Column>
                <Grid.Column width={5}>
                  country:{" "}
                  <Label basic color="blue">
                    <Input
                      name="country"
                      value={this.state.userData.location_country}
                      onChange={this.onChange}
                    />
                  </Label>
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
            <div>
              <p>Time Availability:</p>
              <div>
                Morning:
                <Label basic color="blue">
                  {this.state.mornfrom}
                </Label>
                <Label basic color="red">
                  {this.state.mornto}
                </Label>
              </div>
              <div>
                Evening:
                <Label basic color="blue">
                  {this.state.mornfrom}
                </Label>
                <Label basic color="red">
                  {this.state.mornto}
                </Label>
              </div>
            </div>
          </Card.Content>
          <Card.Content textAlign="right">
            <Button onClick={this.show2} color="green">
              schedule time
            </Button>
            <Confirm
              open={this.state.open2}
              content={this.renderSchedule()}
              header="Set time of your availability"
              onCancel={this.handleCancelSchedule}
              onConfirm={this.handleConfirmSchedule}
              size="large"
            />
            <Button onClick={this.show} color="red">
              Delete Profile
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
      dispatch(createDoctorsSchedule(user, history, id, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
