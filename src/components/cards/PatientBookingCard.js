import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { deleteAppointmentBooking } from "../../actions/bookingActions";

class PatientBookingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      id: "",
      role: "",
      yourID: this.props.yourSocketId,
      socketCurrent: this.props.socketCurrent,
      users: {},
      receivingCall: false,
      caller: "",
      callerSignal: "",
      stream: "",
      callAccepted: false,
      visible: true,
      partnerSocketId: "",
      partnerId: "",
      partnerName: "",
      redirect: false,
      enableCallButton: false
    };
    this.socket = {};
  }

  componentWillMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken,
        id: this.documentData.user.id,
        role: this.documentData.user.role
      });
    } else {
      this.setState({
        token: "",
        id: "",
        role: ""
      });
    }

    setInterval(() => {
      const a = this.props.timeSlot;

      const [timeStart, unit1, dash, timeEnd, unit2] = a.split(" ");

      //console.log(timeStart);

      let format = "h:mm";

      const curTime = moment().format("h:mm");

      const time = moment(curTime, format),
        beforeTime = moment(timeStart, format),
        afterTime = moment(timeEnd, format);

      if (time.isBetween(beforeTime, afterTime)) {
        this.setState({ enableCallButton: true });
        console.log("true");
      } else {
        this.setState({ enableCallButton: false });
        console.log("false");
      }
    }, 20000);
  }

  handleClickDelete = (doctorId, patientId, date, time) => {
    const deleteData = {
      date: date,
      timeSlot: time,
      doctor: doctorId,
      patient: patientId
    };
    this.props.dispatch(deleteAppointmentBooking(deleteData, this.state.token));
  };

  handleClickGetSocket = doctorId => {
    const data = {
      id: doctorId
    };
    axios.get(`/v1/users/${data.id}`).then(res => {
      this.setState({
        partnerSocketId: res.data.socketHandler,
        partnerId: res.data.id,
        partnerName: res.data.name
      });
    });

    setTimeout(() => {
      this.setState({ redirect: true });
    }, 1000);
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/call-outgoing",
            socketIdProps: this.state.yourID, //passing role to signup
            partnerSocketIdProps: this.state.partnerSocketId,
            partnerIdProps: this.state.partnerId,
            partnerNameProps: this.state.partnerName,
            socketCurrentProps: this.state.socketCurrent,
            userId: this.state.id,
            role: this.state.role
          }}
        />
      );
    }

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
                      this.handleClickDelete(
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

                  {this.state.enableCallButton ? (
                    <button
                      onClick={() =>
                        this.handleClickGetSocket(this.props.doctorId)
                      }
                      className="btn btn-outline-info"
                    >
                      call doctor
                    </button>
                  ) : null}

                  {/* <button
                    onClick={() =>
                      this.handleClickGetSocket(this.props.doctorId)
                    }
                    className="btn btn-outline-info"
                  >
                    call doctor
                  </button> */}
                </div>
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
