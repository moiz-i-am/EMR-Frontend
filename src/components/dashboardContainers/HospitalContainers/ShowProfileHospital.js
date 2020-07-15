import React, { Component } from "react";
import { Card, Grid, Image, Label } from "semantic-ui-react";

export class ShowProfileHospital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    };
  }

  render() {
    return (
      <div className="main-view-profile-info">
        <Card fluid raised>
          <Card.Content>
            <Grid>
              {/* <Grid.Column width={5}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                    size="small"
                    circular
                  />
                </div>
              </Grid.Column> */}

              <Grid.Column width={6}>
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "bolder",
                    marginTop: "30px"
                  }}
                >
                  {this.state.userData.name}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "normal",
                    marginTop: "15px",
                    color: "#37B6AD"
                  }}
                >
                  {this.state.userData.email}
                </div>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "normal",
                marginTop: "15px"
              }}
            >
              Phone no : {this.state.userData.phone}
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
                    {this.state.userData.location_city}
                  </Label>
                </Grid.Column>
                <Grid.Column width={5}>
                  state:{" "}
                  <Label basic color="blue">
                    {this.state.userData.location_state}
                  </Label>
                </Grid.Column>
                <Grid.Column width={5}>
                  country:{" "}
                  <Label basic color="blue">
                    {this.state.userData.location_country}
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
        </Card>
      </div>
    );
  }
}

export default ShowProfileHospital;
