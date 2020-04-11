import React, { Component } from "react";
import { Card, Button, Label, Icon, Confirm } from "semantic-ui-react";
import DatePicker from "react-horizontal-datepicker";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";

import { getDoctorTimeSlots } from "./../actions/schedulingActions";
import { createAppointmentBooking } from "./../actions/bookingActions";

export class AppointmentBooking extends Component {
  state = {
    token: "",
    patientId: "",
    docId: this.props.docId,
    choosenSlot: "",
    date: "",
    open: false
  };

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken,
        patientId: this.documentData.user.id,
        name: this.documentData.user.name
      });
    } else {
      this.setState({
        token: "",
        patientId: ""
      });
    }
  }

  show = () => this.setState({ open: true });

  handleConfirm = () => {
    if (this.props.auth.isAuthenticated) {
      const bookingData = {
        date: this.state.date,
        doctor: this.state.docId,
        patient: this.state.patientId,
        timeSlot: this.state.choosenSlot
      };
      this.props.createAppointmentBooking(bookingData, this.state.token);
      this.setState({ open: false });
    } else {
      console.log("ERROR: not authanticated");
    }
  };

  handleCancel = () => this.setState({ open: false });

  renderConfirmation() {
    if (this.props.auth.isAuthenticated) {
      return <div style={{ textAlign: "center" }}>hello bc</div>;
    } else {
      return <div style={{ textAlign: "center" }}>login kr bc</div>;
    }
  }

  addTimeSlot = schedule => {
    this.setState({
      choosenSlot: schedule
    });
  };

  //////////////////////////////////////////// no bookings yet check no appearing need to fix it ////////

  renderDocTimeSlots = schedules =>
    schedules.schedule ? (
      <div>
        {schedules.schedule.map(schedule => (
          <div>
            {schedule === null ? (
              <h1>No Bookings Yet</h1>
            ) : (
              schedule.timeSlots.map(booking => {
                if (booking.reserved != "true") {
                  return (
                    <div
                      id="lab"
                      key={booking.value}
                      style={{ display: "inline-block", padding: "5px" }}
                    >
                      <Button
                        inverted
                        color="blue"
                        onClick={() => this.addTimeSlot(booking.label)}
                      >
                        <Icon name="clock" /> {booking.label}
                      </Button>
                    </div>
                  );
                }
              })
            )}
          </div>
        ))}
      </div>
    ) : (
      <div style={{ height: "60px" }}>Sorry, no time slots available</div>
    );

  render() {
    let schedules = this.props.schedule;

    const selectedDay = val => {
      const localTime = moment(val).format("YYYY-MM-DD"); // store localTime
      const proposedDate = localTime + "T19:00:00.000Z";
      const docData = {
        user: this.state.docId,
        date: proposedDate
      };
      // redux function for rendering time slots
      this.props.getDoctorTimeSlots(docData);
      this.setState({ date: proposedDate, choosenSlot: "" });
    };

    return (
      <Card>
        <Card.Content>
          <p>PICK A TIME SLOT</p>
          <p style={{ fontWeight: "bolder" }}>{this.props.docName}</p>
        </Card.Content>
        <Card.Content>
          <div style={{ width: "100%" }}>
            <DatePicker
              getSelectedDay={selectedDay}
              shouldScroll={true}
              endDate={100}
            />
          </div>
        </Card.Content>
        <Card.Content>{this.renderDocTimeSlots(schedules)}</Card.Content>
        <Card.Content extra>
          <Button onClick={this.show} color="blue" style={{ width: "100%" }}>
            Book Now
          </Button>
          <Confirm
            open={this.state.open}
            content={this.renderConfirmation()}
            header="Are you sure you want to Book according to these"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            size="medium"
          />
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    schedule: state.schedule
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    createAppointmentBooking: (bookingData, token) =>
      dispatch(createAppointmentBooking(bookingData, token)),
    getDoctorTimeSlots: data => dispatch(getDoctorTimeSlots(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppointmentBooking));

// export default connect(mapStateToProps, {
//   getDoctorTimeSlots
// })(AppointmentBooking);
