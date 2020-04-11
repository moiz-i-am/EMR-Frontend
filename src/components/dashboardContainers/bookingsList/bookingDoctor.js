import React, { Component } from "react";
import axios from "axios";

import DoctorBookingCard from "../../cards/DoctorBookingCard";

class bookingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      bookings: []
    };
  }

  componentDidMount() {
    const data = {
      doctor: this.state.id
    };
    axios.post(`/v1/booking/bookingList/doctor`, data).then(res => {
      this.setState({ bookings: res.data });
    });
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
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default bookingDoctor;
