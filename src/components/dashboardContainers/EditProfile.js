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
  Confirm
} from "semantic-ui-react";
import { connect } from "react-redux";

// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

import Select from "react-select";
import { timeOptions } from "../../data/data";

import { updateUserData, deleteUser } from "./../../actions/userDetailsAction";
import { withRouter } from "react-router-dom";

// const localizer = momentLocalizer(moment);
// const DnDCalendar = withDragAndDrop(Calendar);

class EditProfile extends Component {
  state = {
    token: "",
    id: "",
    name: "",
    email: "",
    phone: "",
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
    eveto: "9:00",
    selectedHospitals: [],
    selectedSpecializations: [],
    open: false,
    open2: false,
    userData: this.props.userData,
    val: [],
    timeRange: ""
    // events: [
    //   {
    //     start: new Date(),
    //     end: new Date(moment().add(1, "days", "time")),
    //     title: "Some title"
    //   }
    // ],
    // selectedDate: "",
    // selectedDay: ""
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
    console.log(this.documentData);
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

  handleConfirmSchedule = () => this.setState({ open2: false });

  onSubmit = e => {
    e.preventDefault();

    const upUserData = {
      name: this.state.name,
      phone: this.state.phone,
      specializations: this.state.selectedSpecializations
    };
    if (this.props.auth.isAuthenticated) {
      this.props.updateUserData(
        upUserData,
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
    console.log(this.state.selectedSpecializations, "8888");
    //update the state
    this.setState({
      selectedSpecializations: this.state.selectedSpecializations
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

  // renderEditProfile = users =>
  //   users.user ? (

  //   ) : null;

  // onEventResize = (type, { event, start, end, allDay }) => {
  //   debugger;
  //   this.setState(state => {
  //     state.events[0].start = start;
  //     state.events[0].end = end;
  //     return { events: state.events };
  //   });
  // };

  // onEventDrop = ({ event, start, end, allDay }) => {
  //   console.log(start);
  // };

  onSelected = (value, { action, removedValue }) => {
    this.setState({ val: value });
  };

  handleSelect = ranges => {
    console.log(ranges);
    this.setState({ timeRange: ranges });
    //this.setState = { ranges };
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };

  renderSchedule() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    };
    return (
      <div>
        {/* <DnDCalendar
          selectable={true}
          localizer={localizer}
          timeslots={1}
          events={this.state.events}
          min={new Date(2020, 10, 0, 8, 0, 0)}
          max={new Date(2020, 10, 0, 20, 0, 0)}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          date={this.state.selectedDay}
          style={{ height: 500 }}
          onNavigate={date => {
            this.setState({ selectedDate: date });
          }}
        /> */}
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: "1" }}>
            <DateRangePicker
              ranges={[selectionRange]}
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

  render() {
    console.log(this.state.val);
    console.log(this.state.timeRange);
    return (
      <div className="main-view-profile-info">
        <form noValidate onSubmit={this.onSubmit}>
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
                      {this.state.location}
                    </Label>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    state:{" "}
                    <Label basic color="blue">
                      {this.state.location}
                    </Label>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    country:{" "}
                    <Label basic color="blue">
                      {this.state.location}
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
                {/* <Button onClick={e => this.addHospital(e)}>Add Hospital</Button> */}
              </div>
              <div>
                <p>Specialization:</p>
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
              <Button type="submit" color="blue">
                Update
              </Button>
              <Button onClick={this.show2} color="green">
                schedule time
              </Button>
              <Confirm
                open={this.state.open2}
                content={this.renderSchedule()}
                header="Set time of your availability"
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirmSchedule}
                size="large"
              />
            </Card.Content>
          </Card>
        </form>
      </div>
    );
  }
}
EditProfile.propTypes = {
  updateUserData: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
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
    deleteUser: (id, token) => dispatch(deleteUser(id, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
