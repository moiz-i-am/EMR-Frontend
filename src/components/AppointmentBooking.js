import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

const description = [
  "Amy is a violinist with 2 years experience in the wedding industry.",
  "She enjoys the outdoors and currently resides in upstate New York."
].join(" ");

export class AppointmentBooking extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <p>PICK A TIME SLOT</p>
            <p style={{ fontWeight: "bolder" }}>{this.props.docName}</p>
          </Card.Content>
          <Card.Content header="Calander strip will be here" />
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
