import React, { Component } from "react";
import axios from "axios";

import PatientBookingCard from "../../cards/PatientBookingCard";

class bookingPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      bookings: []
    };
  }

  componentDidMount() {
    const data = {
      patient: this.state.id
    };
    axios.post(`/v1/booking/bookingList/patient`, data).then(res => {
      this.setState({ bookings: res.data });
      const hello = JSON.stringify(res.data);
      console.log("res data: " + hello);
    });
  }

  render() {
    console.log("booking state: " + this.state.bookings);
    return (
      <div>
        <div className="generating-area ">
          <div className="container">
            <div className="rows d-flex justify-content-center">
              <div className="col-lg-8">
                <div className="section-tittle text-center">
                  <h2> My bookings</h2>
                </div>
              </div>
            </div>
            {this.state.bookings.length === 0 ? (
              <h1>No Bookings Yet</h1>
            ) : (
              this.state.bookings.map(booking => {
                return (
                  <div key={booking.id}>
                    <PatientBookingCard
                      date={booking.date}
                      doctor={booking.doctor.name}
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

export default bookingPatient;
