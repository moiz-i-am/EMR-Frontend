import React, { Component } from "react";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";

class footer extends Component {
  render() {
    return (
      <div>
        <Segment inverted vertical style={{ padding: "5em 0em" }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">Doctors</List.Item>
                    <List.Item as="a">Labs</List.Item>
                    <List.Item as="a">Video call checkups</List.Item>
                    <List.Item as="a">Online storage of medical data</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">Doctors</List.Item>
                    <List.Item as="a">Labs</List.Item>
                    <List.Item as="a">Video call checkups</List.Item>
                    <List.Item as="a">Online storage of medical data</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    HEALTH-E&copy;
                  </Header>
                  <p>
                    Powred by
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bolder",
                        fontSize: "20px"
                      }}
                    >
                      {" "}
                      Soft{" "}
                    </span>{" "}
                    <span style={{ color: "#fff" }}> Lab </span> <br />
                    All Rights Reserved © 2016-{new Date().getFullYear()}
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default footer;
