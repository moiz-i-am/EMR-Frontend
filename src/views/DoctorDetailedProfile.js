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
      <Grid>
        <Grid.Column width={12}>
          <DocorsProfileCards
            docName={users.user.name}
            docEmail={users.user.email}
          />
          <TabbedSection />
        </Grid.Column>
        <Grid.Column width={4}>
          <AppointmentBooking docName={users.user.name} />
        </Grid.Column>
      </Grid>
    ) : null;

  render() {
    let users = this.props.user;
    console.log(this.props);
    return <div>{this.renderDocProfile(users)}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(DoctorDetailedProfile);
