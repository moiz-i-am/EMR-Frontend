import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import DatePicker from "react-horizontal-datepicker";

const description = [
  "Amy is a violinist with 2 years experience in the wedding industry.",
  "She enjoys the outdoors and currently resides in upstate New York."
].join(" ");

export class AppointmentBooking extends Component {
  render() {
    const selectedDay = val => {
      console.log(val);
    };
    return (
      <div style={{ width: "438px" }}>
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
                selectDate={new Date("2020-01-30")}
              />
            </div>
          </Card.Content>
          <Card.Content description={description} />
          <Card.Content extra>
            <Button color="blue" style={{ width: "100%" }}>
              Book Now
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default AppointmentBooking;
