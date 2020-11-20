import React, { Component } from "react";
import {
  Grid,
  Label,
  Card,
  Button,
  List,
  Rating,
  Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import "./../styles/profileCards.css";

import axios from "axios";

import Image from "../components/profilePicture/Image";

class ProfileCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specializations: this.props.docSpec,
      docId: this.props.docId,
      image: ""
    };
  }

  componentDidMount() {
    const userId = this.state.docId;

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
                          {/* <div
                            style={{ borderRadius: "50%", textAlign: "center" }}
                          > */}
                          <Image contain fileURL={this.state.image} />
                          {/* </div> */}
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
                          Discription......
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
                                  <Label
                                    style={{
                                      backgroundColor: "#990099",
                                      color: "#FFFFFF"
                                    }}
                                  >
                                    {specializations}
                                  </Label>
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
                          defaultRating={this.props.rating}
                          disabled
                          icon="star"
                          size="huge"
                        />
                        <List style={{ color: "black" }}>
                          <List.Item
                            icon="money"
                            content={<p>{this.props.price}</p>}
                          />
                          {this.props.docLocation ? (
                            <List.Item
                              icon="marker"
                              content={<p>{this.props.docLocation}</p>}
                            />
                          ) : null}
                          <List.Item
                            icon="mail"
                            content={
                              <a href={`mailto: ${this.props.docEmail}`}>
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
                        style={{ backgroundColor: "#990099", color: "#FFFFFF" }}
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
