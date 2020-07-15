import React, { Component } from "react";
import { Card, Button, Icon, Confirm, Message } from "semantic-ui-react";
import DatePicker from "react-horizontal-datepicker";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";

import { getDoctorTimeSlots } from "./../actions/schedulingActions";
import { createAppointmentBooking } from "./../actions/bookingActions";
import MainStyles from "../styles/main.style";
import LoginPopup from "./LoginPopup";

import PaymentIndex from "../containers/PaymentContainer/CheckoutForm";

export class AppointmentBooking extends Component {
  state = {
    token: "",
    patientId: "",
    name: "",
    docId: this.props.docId,
    choosenSlot: "",
    date: "",
    role: "",
    open: false,
    success: false
  };

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken,
        patientId: this.documentData.user.id,
        name: this.documentData.user.name,
        role: this.documentData.user.role
      });
    } else {
      this.setState({
        token: "",
        patientId: "",
        role: "",
        name: ""
      });
    }
  }

  componentWillReceiveProps() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        patientId: this.documentData.user.id,
        name: this.documentData.user.name,
        role: this.documentData.user.role
      });
    } else {
      this.setState({
        patientId: "",
        name: "",
        role: ""
      });
    }
  }

  show = () => this.setState({ open: true });

  handleClose = () => this.setState({ success: false });

  handleConfirm = () => {
    if (this.props.auth.isAuthenticated) {
      const bookingData = {
        date: this.state.date,
        doctor: this.state.docId,
        patient: this.state.patientId,
        timeSlot: this.state.choosenSlot
      };
      if (this.state.choosenSlot !== "") {
        if (
          this.state.role === "doctor" ||
          this.state.role === "lab" ||
          this.state.role === "hospital" ||
          this.state.role === "admin"
        ) {
          return alert(
            `sorry you are ${this.state.role} you cannot make booking form this account !!!`
          );
        } else {
          this.props.createAppointmentBooking(bookingData, this.state.token);
          this.setState({ open: false, success: true });
          setTimeout(() => {
            this.setState({ success: false });
          }, 3000);
        }
      } else {
        return alert(`please select a time slot`);
      }
    } else {
      console.log("ERROR: not authanticated");
    }
  };

  handleCancel = () => this.setState({ open: false });

  renderConfirmation() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          <div style={{ textAlign: "center" }}>
            <p>
              <span>Doctor Name: </span>
              {this.props.docName}
            </p>
            <p>
              <span>patient Name: </span>
              {this.state.name}
            </p>
            <p>
              <span>Date Of Appointment: </span>
              {this.state.date}
            </p>
            <p>
              <span>TIME Of Appointment: </span>
              {this.state.choosenSlot}
            </p>
            <h4>
              <span>Price: </span>
              {this.props.price}
            </h4>
          </div>
          <div>
            <PaymentIndex
              amount={this.props.price}
              doctorId={this.state.docId}
              doctorName={this.state.docName}
              patientId={this.state.patientId}
              patientName={this.state.name}
              date={this.state.date}
              time={this.state.choosenSlot}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <LoginPopup />
          <MainStyles />
        </div>
      );
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
                if (booking.reserved !== "true") {
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
          <Button
            className="btn btn-ans"
            onClick={this.show}
            style={{
              width: "100%",
              color: "#ffffff",
              backgroundColor: "#4D7BF3"
            }}
          >
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
        <div style={{ position: "absolute" }}>
          {this.state.success ? (
            <div
              style={{
                left: "75%",
                position: "fixed",
                top: "90%",
                zIndex: 1000
              }}
            >
              <Message
                color="green"
                onDismiss={this.handleClose}
                header="Appointment is created successfully"
              />
            </div>
          ) : null}
        </div>
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
