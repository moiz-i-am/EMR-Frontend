import React, { Component } from "react";
import {
  Grid,
  Label,
  Image,
  Card,
  Button,
  List,
  Rating,
  Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import "./../styles/profileCards.css";
import logo from "./../assets/user-solid.svg";

class ProfileCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specializations: this.props.docSpec,
      docId: this.props.docId
    };
  }

  render() {
    return (
      <div className="search">
        <div class="single-generating">
          <Fade left>
            <div className="userCard">
              <Card style={{ width: "100%" }}>
                <Card.Content className="left aligned">
                  <div className="two column headers">
                    <Card.Header>
                      <Grid>
                        <Grid.Column width={4}>
                          <div
                            style={{ borderRadius: "50%", textAlign: "center" }}
                          >
                            <Image src={logo} size="tiny" />
                          </div>
                        </Grid.Column>
                        <Grid.Column width={12}>
                          <div
                            style={{
                              textAlign: "left",
                              paddingTop: "27px",
                              color: "black",
                              fontWeight: "bolder",
                              fontSize: "25px"
                            }}
                          >
                            {this.props.docName}
                          </div>
                        </Grid.Column>
                      </Grid>
                    </Card.Header>
                  </div>
                  <Divider />
                </Card.Content>
                <div className="short-info">
                  <Grid stackable>
                    <Grid.Column width={10}>
                      <div style={{ paddingLeft: "15px" }}>
                        <Card.Meta>
                          Discription......asdhkjashdkjahsdkjh
                          <br />
                          ahsgdjahgsdjhgsad
                          <br />
                        </Card.Meta>
                        <Divider />
                        <div>
                          {this.state.specializations == null ? (
                            <Label>no specializations yet</Label>
                          ) : (
                            this.state.specializations.map(specializations => {
                              return (
                                <div
                                  style={{
                                    display: "inline-block",
                                    padding: "5px"
                                  }}
                                >
                                  <Label>{specializations}</Label>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </Grid.Column>

                    <Grid.Column width={6}>
                      <div style={{ paddingLeft: "15px" }}>
                        <Rating
                          maxRating={5}
                          defaultRating={3}
                          disabled
                          icon="star"
                          size="huge"
                        />
                        <List style={{ color: "black" }}>
                          <List.Item icon="money" content="3000 -/Rs" />
                          <List.Item
                            icon="marker"
                            content={<p>{this.props.docLocation}</p>}
                          />
                          <List.Item
                            icon="mail"
                            content={
                              <a href="mailto: ${this.props.docEmail}">
                                {this.props.docEmail}
                              </a>
                            }
                          />
                        </List>
                      </div>
                    </Grid.Column>
                  </Grid>
                </div>
                <Card.Content>
                  <div style={{ textAlign: "right" }}>
                    <Link to={`/docProfile/${this.state.docId}`}>
                      <Button
                        icon="user md"
                        labelPosition="left"
                        content="Visit Profile"
                      />
                    </Link>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </Fade>
        </div>
      </div>
    );
  }
}

export default ProfileCards;
