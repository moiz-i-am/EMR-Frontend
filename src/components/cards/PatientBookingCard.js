import React, { Component } from "react";

class PatientBookingCard extends Component {
  render() {
    return (
      <div>
        <div className="column">
          <div className="col-lg-6 col-md-6">
            <div className="single-generating d-flex mb-30">
              <div className="generating-icon">
                <span className="flaticon-chart"></span>
              </div>
              <div className="generating-cap">
                <h4> {this.props.doctor}</h4>

                <p>
                  <span style={{ color: "black" }}>Date of Appointment: </span>
                  {new Date(this.props.date).toDateString()}
                </p>
                <p>
                  <span style={{ color: "black" }}>Time of Appointment: </span>
                  {this.props.timeSlot}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientBookingCard;
