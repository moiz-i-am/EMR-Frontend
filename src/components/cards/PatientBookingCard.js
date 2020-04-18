import React, { Component } from "react";
import { connect } from "react-redux";

import { deleteAppointmentBooking } from "../../actions/bookingActions";

class PatientBookingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken
      });
    } else {
      this.setState({
        token: ""
      });
    }
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
                    style={{ backgroundColor: "red" }}
                  >
                    delete appointment
                  </button>
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

// export default PatientBookingCard;
