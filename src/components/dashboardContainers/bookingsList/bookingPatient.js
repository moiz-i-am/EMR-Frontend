import React, { Component } from "react";
import axios from "axios";
import { Segment, Dimmer, Loader, Image } from "semantic-ui-react";

import PatientBookingCard from "../../cards/PatientBookingCard";

class bookingPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      bookings: [],
      loading: false
    };
  }

  componentDidMount() {
    const data = {
      patient: this.state.id
    };
    axios.post(`/v1/booking/bookingList/patient`, data).then(res => {
      // this.setState({ bookings: res.data });
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, bookings: res.data });
      }, 2000);
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
                      doctorId={booking.doctor._id}
                      patientId={booking.patient}
                      timeSlot={booking.timeSlot}
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

export default bookingPatient;
