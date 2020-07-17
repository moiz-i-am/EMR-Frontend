import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
class DoctorBookingCard extends Component {
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
      dateOfAppointment: this.props.date
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
    }, 3000);
  }

  handleClickGetSocket = patientId => {
    const data = {
      id: patientId
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
    // converting date to proper booked
    const d = new Date(this.state.dateOfAppointment);
    d.setDate(d.getDate() - 1);

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
                <h4> {this.props.patient}</h4>

                <p>
                  <span style={{ color: "black" }}>Date of Appointment: </span>
                  {/* {new Date(this.props.date).toDateString()} */}
                  {new Date(d).toDateString()}
                </p>
                <p>
                  <span style={{ color: "black" }}>Time of Appointment: </span>
                  {this.props.timeSlot}
                </p>

                <button
                  onClick={() =>
                    this.handleClickGetSocket(this.props.patientId)
                  }
                  className="btn btn-outline-info"
                >
                  call patient
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorBookingCard;
