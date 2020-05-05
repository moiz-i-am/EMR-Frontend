import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Message } from "semantic-ui-react";

import { deleteAppointmentBooking } from "../../actions/bookingActions";

class PatientBookingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      id: "",
      yourID: this.props.yourSocketId,
      socketCurrent: this.props.socketCurrent,
      users: {},
      receivingCall: false,
      caller: "",
      callerSignal: "",
      stream: "",
      callAccepted: false,
      visible: true
    };
    this.socket = {};
  }

  componentWillMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken,
        id: this.documentData.user.id
      });
    } else {
      this.setState({
        token: "",
        id: ""
      });
    }

    this.state.socketCurrent.on("hey", data => {
      this.setState({ receivingCall: true });
      this.setState({ caller: data.from });
      this.setState({ callerSignal: data.signal });
    });
  }

  handleClick = (doctorId, patientId, date, time) => {
    const deleteData = {
      date: date,
      timeSlot: time,
      doctor: doctorId,
      patient: patientId
    };
    this.props.dispatch(deleteAppointmentBooking(deleteData, this.state.token));
  };

  render() {
    let incomingCall;
    if (this.state.receivingCall) {
      incomingCall = (
        <div>
          <h1>{this.state.caller} is calling you</h1>
          <Link
            to={{
              pathname: "/call-incoming",
              socketIdProps: this.state.yourID, //passing role to signup
              partnerSocketIdProps: this.props.socketId,
              socketCurrentProps: this.state.socketCurrent,
              callerProps: this.state.caller,
              callerSignalProps: this.state.callerSignal
            }}
          >
            <button className="btn btn-outline-success">Accept</button>
          </Link>
        </div>
      );
    }

    //console.log("socketCurrent: " + this.state.socketCurrent);

    return (
      <div>
        <div className="column">
          <div className="col-lg-6 col-md-6">
            <div className="single-generating d-flex mb-30">
              <div className="generating-icon">
                <span className="flaticon-chart"></span>
              </div>
              <div className="generating-cap">
                <h4> {this.props.doctor} </h4>

                <p>
                  <span style={{ color: "black" }}>Date of Appointment: </span>
                  {new Date(this.props.date).toDateString()}
                </p>
                <p>
                  <span style={{ color: "black" }}>Time of Appointment: </span>
                  {this.props.timeSlot}
                </p>
                <div>
                  <button
                    onClick={() =>
                      this.handleClick(
                        this.props.doctorId,
                        this.props.patientId,
                        this.props.date,
                        this.props.timeSlot
                      )
                    }
                    className="btn btn-outline-danger"
                  >
                    delete appointment
                  </button>
                  <Link
                    to={{
                      pathname: "/call-outgoing",
                      socketIdProps: this.state.yourID, //passing role to signup
                      partnerSocketIdProps: this.props.socketId,
                      socketCurrentProps: this.state.socketCurrent
                    }}
                  >
                    <button className="btn btn-outline-info">
                      call doctor {this.props.socketId}
                    </button>
                  </Link>
                </div>
                {incomingCall}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    deleteAppointmentBooking: deleteData =>
      dispatch(deleteAppointmentBooking(deleteData))
  };
};

export default connect(mapDispatchToProps)(PatientBookingCard);
