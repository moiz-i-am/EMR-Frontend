import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

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
      redirect: false
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
                  {new Date(this.props.date).toDateString()}
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
