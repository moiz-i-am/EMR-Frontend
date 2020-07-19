import React, { Component } from "react";
import { Card, Grid, Label } from "semantic-ui-react";
import axios from "axios";

import Image from "../../profilePicture/Image";

export class ShowProfilePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      image: ""
    };
  }

  componentDidMount() {
    const userId = this.state.userData.id;

    axios
      .get(`/v1/uploading/profilePicture/${userId}`)
      .then(res => {
        console.log(res.data.post);
        this.setState({
          image: "http://localhost:3001/" + res.data.post.imageURL
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="main-view-profile-info">
        <Card fluid raised>
          <Card.Content>
            <Grid>
              <Grid.Column width={5}>
                <Image contain fileURL={this.state.image} />
              </Grid.Column>

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
        </Card>
      </div>
    );
  }
}

export default ShowProfilePatient;
