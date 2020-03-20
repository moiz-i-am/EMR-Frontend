import React, { Component } from "react";
import { Card, Button, Label, Icon } from "semantic-ui-react";
import DatePicker from "react-horizontal-datepicker";
import { connect } from "react-redux";
import moment from "moment";
import { getDoctorTimeSlots } from "./../actions/schedulingActions";

export class AppointmentBooking extends Component {
  state = {
    docId: this.props.docId,
    choosenSlot: "",
    post: ""
  };

  handleClick(index) {
    this.setState({ post: index });
  }

  renderDocTimeSlots = schedules =>
    schedules.schedule ? (
      <div>
        {schedules.schedule[0].timeSlots.map(function(schedule, index) {
          if (schedules) {
            return (
              <div
                id="lab"
                key={schedule.value}
                style={{ display: "inline-block", padding: "5px" }}
              >
                <Label>
                  <Icon name="clock" /> {schedule.label}
                </Label>
              </div>
            );
          } else {
            return <div>sorry janu</div>;
          }
        })}
      </div>
    ) : (
      <div style={{ height: "60px" }}>Sorry, no time slots available</div>
    );

  render() {
    let schedules = this.props.schedule;

    console.log("psotays: " + this.state.post);

    const selectedDay = val => {
      const localTime = moment(val).format("YYYY-MM-DD"); // store localTime
      const proposedDate = localTime + "T19:00:00.000Z";
      const docData = {
        user: this.state.docId,
        date: proposedDate
      };
      // redux function for rendering time slots
      this.props.getDoctorTimeSlots(docData);
    };

    return (
      <Card>
        <Card.Content>
          <p>PICK A TIME SLOT</p>
          <p style={{ fontWeight: "bolder" }}>{this.props.docName}</p>
        </Card.Content>
        <Card.Content>
          <div style={{ width: "100%" }}>
            <DatePicker
              getSelectedDay={selectedDay}
              shouldScroll={true}
              endDate={100}
            />
          </div>
        </Card.Content>
        <Card.Content>{this.renderDocTimeSlots(schedules)}</Card.Content>
        <Card.Content extra>
          <Button color="blue" style={{ width: "100%" }}>
            Book Now
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule
  };
};

export default connect(mapStateToProps, {
  getDoctorTimeSlots
})(AppointmentBooking);
