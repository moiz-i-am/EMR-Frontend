import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import DocorsProfileCards from "./DoctorsProfileCards";
import TabbedSection from "./TabbedSection";
import { connect } from "react-redux";

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
      <div style={{ marginTop: "20px" }}>
        <Grid>
          <Grid.Column width={10}>
            <DocorsProfileCards
              docName={users.user.name}
              docEmail={users.user.email}
              docSpec={users.user.specializations}
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
    return <div>{this.renderDocProfile(users)}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(DoctorDetailedProfile);
