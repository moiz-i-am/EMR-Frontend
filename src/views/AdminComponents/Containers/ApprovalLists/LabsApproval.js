import React, { Component } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import LabApprovalCard from "../cards/LabApprovalCard";

class LabApproval extends Component {
  state = {
    labs: []
  };

  componentDidMount() {
    axios.get(`/v1/users`).then(res => {
      this.setState({ labs: res.data });
    });
  }

  render() {
    return (
      <Container style={{ width: "90%" }}>
        <div className="main_DocList-div" style={{ backgroundColor: "white" }}>
          {this.state.labs.length === 0 ? (
            <h1>No Doctors Found</h1>
          ) : (
            this.state.labs.map(labs => {
              if (labs.role === "lab") {
                if (labs.verified === false) {
                  return (
                    <div key={labs.id}>
                      <LabApprovalCard
                        labId={labs.id}
                        labName={labs.name}
                        labEmail={labs.email}
                        labSpec={labs.specializations}
                        labLocation={`${labs.location_city}, ${labs.location_state}, ${labs.location_country}`}
                      />
                    </div>
                  );
                }
              }
            })
          )}
        </div>
      </Container>
    );
  }
}

export default LabApproval;
