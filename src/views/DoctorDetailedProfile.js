import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import DocorsProfileCards from "./DoctorsProfileCards";
import TabbedSection from "./TabbedSection";

const docInfo = {
  id: "1",
  pic: "https://randomuser.me/api/portraits/men/84.jpg",
  name: "doctor....",
  role: "doctor",
  status: "Not Verified",
  description: "placeholder description...",
  qualification: "placeholder qualification...",
  rating: 0,
  currentLocale: "placeholder hospital...",
  rate: 0
};

export class DoctorDetailedProfile extends Component {
  componentDidMount() {}

  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <DocorsProfileCards {...docInfo} />
          <TabbedSection {...docInfo} />
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid>
    );
  }
}

export default DoctorDetailedProfile;
