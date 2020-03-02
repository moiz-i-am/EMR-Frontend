import React, { Component } from "react";
import { Card, Grid, Image, Label } from "semantic-ui-react";

export class ShowProfile extends Component {
  state = {
    name: "",
    email: "",
    phone: "03214568789",
    location: "wah cantt",
    hos1: "shifa",
    hos2: "city",
    hos3: "quaid e azam",
    spec1: "dermotoligist",
    spec2: "skin specialist",
    spec3: "pechus system",
    mornfrom: "8:00",
    mornto: "10:00",
    evefrom: "5:00",
    eveto: "9:00"
  };

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    console.log(this.documentData);
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        name: this.documentData.user.name,
        email: this.documentData.user.email
      });
    } else {
      this.setState({
        name: "",
        email: "",
        phone: "03214568789",
        location: "wah cantt",
        hos1: "shifa",
        hos2: "city",
        hos3: "quaid e azam",
        spec1: "dermotoligist",
        spec2: "skin specialist",
        spec3: "pechus system",
        mornfrom: "8:00",
        mornto: "10:00",
        evefrom: "5:00",
        eveto: "9:00"
      });
    }
  }

  render() {
    return (
      <div className="main-view-profile-info">
        <Card fluid>
          <Card.Content>
            <Grid>
              <Grid.Column width={5}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                    size="small"
                    circular
                  />
                </div>
              </Grid.Column>

              <Grid.Column width={6}>
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "bolder",
                    marginTop: "30px"
                  }}
                >
                  {this.state.name}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "normal",
                    marginTop: "15px"
                  }}
                >
                  {this.state.email}
                </div>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "normal",
                marginTop: "15px"
              }}
            >
              Phone no : {this.state.phone}
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "normal",
                marginTop: "15px"
              }}
            >
              <Grid>
                <Grid.Column width={5}>
                  city:{" "}
                  <Label basic color="blue">
                    {this.state.location}
                  </Label>
                </Grid.Column>
                <Grid.Column width={5}>
                  state:{" "}
                  <Label basic color="blue">
                    {this.state.location}
                  </Label>
                </Grid.Column>
                <Grid.Column width={5}>
                  country:{" "}
                  <Label basic color="blue">
                    {this.state.location}
                  </Label>
                </Grid.Column>
              </Grid>
            </div>
          </Card.Content>
          <Card.Content>
            <p>
              asjhdkjashdkjashdkjahsdkjhaskjdhkashdashdiuhdkjsdhkjashdkjashdkasd
              asdasdasdasdasdasdasdasjghhhhhhhhhhh
              <br />
              hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
              hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhasdashhhhhhhhhhhhhjkhdakjhdakjhdkjashda
              asdasdasdasdasdasdasdasjghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhdadasd
              asdasdasdasdasdasdasdasjghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhdsad
              asdasdasdasdasdasdasdasjghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhdsad
            </p>
          </Card.Content>
          <Card.Content>
            <div>
              <p>Serving Hospitals:</p>
              <Label size="huge">{this.state.hos1}</Label>
              <Label size="huge">{this.state.hos2}</Label>
              <Label size="huge">{this.state.hos3}</Label>
            </div>
            <div>
              <p>Specialization:</p>
              <Label size="huge">{this.state.spec1}</Label>
              <Label size="huge">{this.state.spec2}</Label>
              <Label size="huge">{this.state.spec3}</Label>
            </div>
            <div>
              <p>Time Availability:</p>
              <div>
                Morning:
                <Label basic color="blue">
                  {this.state.mornfrom}
                </Label>
                <Label basic color="red">
                  {this.state.mornto}
                </Label>
              </div>
              <div>
                Evening:
                <Label basic color="blue">
                  {this.state.mornfrom}
                </Label>
                <Label basic color="red">
                  {this.state.mornto}
                </Label>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default ShowProfile;
