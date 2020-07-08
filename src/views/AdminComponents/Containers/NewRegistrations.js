import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

import DoctorApproval from "../Containers/ApprovalLists/DoctorsApproval";

const panes = [
  {
    menuItem: { key: "doctor", icon: "doctor", content: "Doctors" },
    render: () => (
      <Tab.Pane>
        <DoctorApproval />
      </Tab.Pane>
    )
  },
  {
    menuItem: { key: "hospital", icon: "hospital", content: "Hospitals" },
    render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
  },
  {
    menuItem: { key: "lab", icon: "lab", content: "Labs" },
    render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
  }
];

class NewRegistrations extends Component {
  render() {
    return (
      <div>
        <Tab panes={panes} />
      </div>
    );
  }
}

export default NewRegistrations;
