import React, { Component } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import HospitalApprovalCard from "../cards/HospitalApprovalCard";

class HospitalsApproval extends Component {
  state = {
    hospitals: []
  };

  componentDidMount() {
    axios.get(`/v1/users`).then(res => {
      this.setState({ hospitals: res.data });
    });
  }

  updateListHandler = data => {
    console.log("recieved");
    this.setState({ hospitals: data });
  };

  render() {
    return (
      <Container style={{ width: "90%" }}>
        <div className="main_DocList-div" style={{ backgroundColor: "white" }}>
          {this.state.hospitals.length === 0 ? (
            <h1>No hospitals Found</h1>
          ) : (
            this.state.hospitals.map(hospitals => {
              if (hospitals.role === "hospital") {
                if (hospitals.verified === false) {
                  return (
                    <div key={hospitals.id}>
                      <HospitalApprovalCard
                        hosId={hospitals.id}
                        hosName={hospitals.name}
                        hosEmail={hospitals.email}
                        hosSpec={hospitals.specializations}
                        hosLocation={`${hospitals.location_city}, ${hospitals.location_state}, ${hospitals.location_country}`}
                        updateList={this.updateListHandler}
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

export default HospitalsApproval;
