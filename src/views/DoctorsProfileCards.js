import React, { Component } from "react";
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
  render() {
    return (
      <div className="search">
        <div className="userCard">
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
                      <div style={{ textAlign: "left", paddingTop: "27px" }}>
                        {this.props.docName}
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
                        <a href="mailto: ${this.props.docEmail}">
                          {this.props.docEmail}
                        </a>
                      }
                    />
                    <List.Item
                      icon="linkify"
                      content={
                        <a href="http://www.semantic-ui.com">semantic-ui.com</a>
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
      </div>
    );
  }
}

export default ProfileCards;
