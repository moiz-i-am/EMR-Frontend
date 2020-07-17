import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

import DoctorsApproval from "../Containers/ApprovalLists/DoctorsApproval";
import LabsApproval from "../Containers/ApprovalLists/LabsApproval";
import HospitalsApproval from "../Containers/ApprovalLists/HospitalsApproval";

const panes = [
  {
    menuItem: { key: "doctor", icon: "doctor", content: "Doctors" },
    render: () => (
      <Tab.Pane>
        <DoctorsApproval />
      </Tab.Pane>
    )
  },
  {
    menuItem: { key: "hospital", icon: "hospital", content: "Hospitals" },
    render: () => (
      <Tab.Pane>
        <HospitalsApproval />
      </Tab.Pane>
    )
  },
  {
    menuItem: { key: "lab", icon: "lab", content: "Labs" },
    render: () => (
      <Tab.Pane>
        <LabsApproval />
      </Tab.Pane>
    )
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
