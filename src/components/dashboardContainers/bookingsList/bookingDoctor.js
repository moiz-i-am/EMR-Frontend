import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

import { Segment, Dimmer, Loader, Image } from "semantic-ui-react";

import DoctorBookingCard from "../../cards/DoctorBookingCard copy";

import { updateSocketData } from "../../../actions/userDetailsAction";

class bookingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      token: "",
      bookings: [],
      loading: false,
      yourID: "",
      socketCurrent: ""
    };
    this.socket = {};
  }

  componentDidMount() {
    const data = {
      doctor: this.state.id
    };
    axios.post(`/v1/booking/bookingList/doctor`, data).then(res => {
      // this.setState({ bookings: res.data });
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, bookings: res.data });
      }, 2000);
    });

    /////////////////////////// info from local storage //
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken
        // id: this.documentData.user.id
      });
    } else {
      this.setState({
        token: ""
        // id: ""
      });
    }

    /////////////////////////// for socket /////////////////
    this.socket.current = io.connect("/");
    this.setState({ socketCurrent: this.socket.current });

    this.socket.current.on("yourID", id => {
      this.setState({ yourID: id });
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
      console.log(
        //"sock id: " + updateSocket.socketHandler + " user id: " + this.state.id
        "not logged in"
      );
    }
  }

  render() {
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
              <h1>No Bookings Yet</h1>
            ) : (
              this.state.bookings.map(booking => {
                return (
                  <div key={booking.id}>
                    <DoctorBookingCard
                      date={booking.date}
                      patient={booking.patient.name}
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

// export default bookingDoctor;
