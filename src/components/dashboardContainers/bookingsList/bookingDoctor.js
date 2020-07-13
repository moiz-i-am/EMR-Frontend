import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

import {
  Segment,
  Dimmer,
  Loader,
  Image,
  Button,
  Icon
} from "semantic-ui-react";

import DoctorBookingCard from "../../cards/DoctorBookingCard";

import { updateSocketData } from "../../../actions/userDetailsAction";

class bookingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      token: "",
      role: "",
      bookings: [],
      loading: false,
      yourID: "",
      socketCurrent: "",
      receivingCall: "",
      caller: "",
      callerSignal: "",
      partnerId: "",
      partnerName: ""
    };
    this.socket = {};
  }

  componentDidMount() {
    const data = {
      doctor: this.state.id
    };
    axios.post(`/v1/booking/bookingList/doctor`, data).then(res => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, bookings: res.data });
      }, 2000);
    });

    /////////////////////////// info from local storage //
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken,
        role: this.documentData.user.role
      });
    } else {
      this.setState({
        token: "",
        role: ""
      });
    }

    /////////////////////////// for socket /////////////////
    this.socket.current = io.connect("/");
    this.setState({ socketCurrent: this.socket.current });

    this.socket.current.on("yourID", id => {
      this.setState({ yourID: id });
    });
    this.socket.current.on("hey", data => {
      this.setState({ receivingCall: true });
      this.setState({ caller: data.from });
      this.setState({ callerSignal: data.signal });

      const sock = {
        socketId: this.state.caller
      };
      axios.post(`/v1/users/socket`, sock).then(res => {
        const a = 0;
        this.setState({
          partnerId: res.data[a]._id,
          partnerName: res.data[a].name
        });
      });
    });
  }

  componentDidUpdate() {
    const updateSocket = {
      socketHandler: this.state.yourID
    };
    if (this.props.auth.isAuthenticated) {
      this.props.updateSocketData(
        updateSocket,
        this.state.id,
        this.state.token
      );
    } else {
      console.log("not logged in");
    }
  }

  handleCallDecline = () => {
    this.setState({ receivingCall: false });
  };

  render() {
    console.log("my id bookingDoctor: " + this.state.id);
    console.log(
      "id and name: " + this.state.partnerId + " " + this.state.partnerName
    );
    //////////////////////////////// call accept functionality ////////////////
    let incomingCall;
    if (this.state.receivingCall) {
      incomingCall = (
        <div style={{ backgroundColor: "#2C3436" }}>
          <h1 style={{ padding: "20px", color: "#ffffff" }}>
            {this.state.partnerName} is calling you
          </h1>
          <div style={{ textAlign: "left", padding: "15px" }}>
            <Link
              to={{
                pathname: "/call-incoming",
                socketIdProps: this.state.yourID, //passing role to signup
                socketCurrentProps: this.state.socketCurrent,
                callerProps: this.state.caller,
                callerSignalProps: this.state.callerSignal,
                userId: this.state.id,
                partnerSocketIdProps: this.state.caller,
                partnerIdProps: this.state.partnerId,
                partnerNameProps: this.state.partnerName,
                role: this.state.role
              }}
            >
              <Button
                animated="vertical"
                positive
                style={{ marginRight: "5px", width: "100px" }}
              >
                <Button.Content hidden>Accept Call</Button.Content>
                <Button.Content visible>
                  <Icon name="call" />
                </Button.Content>
              </Button>
            </Link>

            <Button
              animated="vertical"
              negative
              style={{ marginLeft: "5px", width: "100px" }}
              onClick={() => this.handleCallDecline()}
            >
              <Button.Content hidden>Decline Call</Button.Content>
              <Button.Content visible>
                <Icon name="call" />
              </Button.Content>
            </Button>
          </div>
        </div>
      );
    }
    //////////////////////////////// call accept functionality ////////////////

    return (
      <div>
        <div className="generating-area ">
          <div className="container">
            <div className="rows d-flex justify-content-center">
              <div className="col-lg-8">
                <div className="section-tittle text-center">
                  <h2> Upcomming Appointments</h2>
                </div>
              </div>
            </div>

            {this.state.bookings.length === 0 ? (
              this.state.loading ? null : (
                <h1>No Bookings Yet</h1>
              )
            ) : (
              this.state.bookings.map(booking => {
                return (
                  <div key={booking.id}>
                    <DoctorBookingCard
                      date={booking.date}
                      patient={booking.patient.name}
                      patientId={booking.patient._id}
                      timeSlot={booking.timeSlot}
                      socketId={booking.patient.socketHandler}
                      yourSocketId={this.state.yourID}
                      socketCurrent={this.state.socketCurrent}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
        {this.state.loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="massive">Loading</Loader>
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
        <div
          style={{ position: "fixed", top: 0, width: "100%", zIndex: "300000" }}
        >
          {incomingCall}
        </div>
      </div>
    );
  }
}

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
    updateSocketData: (data, history, id, token) =>
      dispatch(updateSocketData(data, history, id, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(bookingDoctor));
