import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import DocorBriefCard from "../components/cards/DoctorBriefCard";
import TabbedSection from "./TabbedSection";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

import {
  getUserWithProfile,
  clearUserWithProfile
} from "./../actions/userDetailsAction";
import AppointmentBooking from "../components/AppointmentBooking";

export class DoctorDetailedProfile extends Component {
  componentDidMount() {
    this.props.dispatch(getUserWithProfile(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearUserWithProfile());
  }

  renderDocProfile = users =>
    users.user ? (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Grid>
          <Grid.Column width={10}>
            <DocorBriefCard
              docName={users.user.name}
              docEmail={users.user.email}
              docSpec={users.user.specializations}
              docLocation={
                users.user.location_city +
                ", " +
                users.user.location_state +
                ", " +
                users.user.location_country
              }
            />
            <TabbedSection />
          </Grid.Column>
          <Grid.Column width={6}>
            <AppointmentBooking
              docName={users.user.name}
              docId={this.props.match.params.id}
            />
          </Grid.Column>
        </Grid>
      </div>
    ) : null;

  render() {
    let users = this.props.user;
    return (
      <div>
        <Container style={{ width: "90%" }}>
          {this.renderDocProfile(users)}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(DoctorDetailedProfile);
