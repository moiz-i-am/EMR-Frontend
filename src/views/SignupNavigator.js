import React, { Component } from "react";
import { GridColumn, List, Grid, Segment, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

class SignupNavigator extends Component {
  render() {
    return (
      <Grid verticalAlign="middle" textAlign="center" padded="vertically">
        <GridColumn style={{ maxWidth: 250 }}>
          <Segment className="navigator">
            <Header
              textAlign="center"
              as="h2"
              dividing
              content="Who are you?"
            />
            <List selection animated>
              <List.Item
                icon="user"
                content={
                  <Link to={{ pathname: "/SignupPatient" }}>
                    I am a Patient
                  </Link>
                }
              />

              <List.Item
                icon="doctor"
                content={
                  <Link
                    to={{
                      pathname: "/SignupDoctor",
                      roleProps: "doctor" //passing role to signup
                    }}
                  >
                    I am a Doctor
                  </Link>
                }
              />

              <List.Item
                icon="hospital"
                content={
                  <Link
                    to={{
                      pathname: "/SignupHospital",
                      roleProps: "hospital" //passing role to signup
                    }}
                  >
                    I am a Hospital
                  </Link>
                }
              />

              <List.Item
                icon="lab"
                content={
                  <Link
                    to={{
                      pathname: "/SignupLab",
                      roleProps: "lab" //passing role to signup
                    }}
                  >
                    I am a Lab
                  </Link>
                }
              />
            </List>
          </Segment>
        </GridColumn>
      </Grid>
    );
  }
}

export default SignupNavigator;
