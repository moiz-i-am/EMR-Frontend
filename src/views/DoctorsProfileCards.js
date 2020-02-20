import React, { Component } from "react";
import axios from "axios";
import {
  Grid,
  Label,
  Image,
  Card,
  Button,
  List,
  Rating
} from "semantic-ui-react";
import "./../styles/profileCards.css";
import logo from "./../assets/user-solid.svg";

class ProfileCards extends Component {
  state = {
    persons: []
  };

  componentDidMount() {
    axios.get(`v1/users`).then(res => {
      console.log(res);
      this.setState({ persons: res.data });
    });
  }

  render() {
    return (
      /// working get........
      <div className="search">
        {this.state.persons.length === 0 ? (
          <h1>No Doctors Found</h1>
        ) : (
          this.state.persons.map(persons => (
            <div className="userCard" key={persons.id}>
              <Card style={{ width: "80%" }}>
                <Card.Content className="left aligned">
                  <div className="two column headers">
                    <Card.Header>
                      <Grid>
                        <Grid.Column width={4}>
                          <div style={{ borderRadius: "50%" }}>
                            <Image src={logo} size="tiny" />
                          </div>
                        </Grid.Column>
                        <Grid.Column width={12}>
                          <div
                            style={{ textAlign: "left", paddingTop: "27px" }}
                          >
                            {persons.name}
                          </div>
                        </Grid.Column>
                      </Grid>
                    </Card.Header>
                  </div>
                </Card.Content>
                <div className="short-info">
                  <Grid>
                    <Grid.Column width={10}>
                      <div style={{ paddingLeft: "15px" }}>
                        <Card.Meta>
                          Discription......asdhkjashdkjahsdkjh
                          <br />
                          ahsgdjahgsdjhgsad
                          <br />
                        </Card.Meta>
                        <div style={{ marginTop: "20px" }}>
                          <Label>23</Label>
                        </div>
                      </div>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Rating
                        maxRating={5}
                        defaultRating={3}
                        icon="star"
                        size="huge"
                      />
                      <List>
                        <List.Item icon="money" content="3000 -/Rs" />
                        <List.Item icon="marker" content="New York, NY" />
                        <List.Item
                          icon="mail"
                          content={
                            <a href="mailto:`${persons.email}`">
                              {persons.email}
                            </a>
                          }
                        />
                        <List.Item
                          icon="linkify"
                          content={
                            <a href="http://www.semantic-ui.com">
                              semantic-ui.com
                            </a>
                          }
                        />
                      </List>
                    </Grid.Column>
                  </Grid>
                </div>
                <Card.Content>
                  <div style={{ textAlign: "right" }}>
                    <Button>Visit Profile</Button>
                    <Button
                      icon="stethoscope"
                      content="Book Appointment"
                      labelPosition="left"
                    />
                  </div>
                </Card.Content>
              </Card>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default ProfileCards;
