import React, { Component } from "react";
import { Grid, Card, List, Divider } from "semantic-ui-react";
import "../../styles/profileCards.css";

class HospitalProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specializations: this.props.docSpec
    };
  }

  render() {
    return (
      <div className="search">
        <div class="single-generating">
          <div className="userCard">
            <Card style={{ width: "100%" }}>
              <Card.Content className="left aligned">
                <div className="two column headers">
                  <Card.Header>
                    <Grid>
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
                          {this.props.hospitalName}
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
                    </div>
                  </Grid.Column>

                  <Grid.Column width={6}>
                    <div style={{ paddingLeft: "15px" }}>
                      <List style={{ color: "black" }}>
                        <List.Item
                          icon="marker"
                          content={<p>{this.props.hospitalLocation}</p>}
                        />
                        <List.Item
                          icon="mail"
                          content={
                            <a href="mailto: ${this.props.docEmail}">
                              {this.props.hospitalEmail}
                            </a>
                          }
                        />
                      </List>
                    </div>
                  </Grid.Column>
                </Grid>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default HospitalProfileCard;
