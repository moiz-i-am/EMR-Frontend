import React, { Component } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import DoctorApprovalCard from "../cards/DoctorApprovalCard";

class DoctorsApproval extends Component {
  state = {
    doctors: []
  };

  componentDidMount() {
    axios.get(`/v1/users`).then(res => {
      this.setState({ doctors: res.data });
    });
  }

  render() {
    return (
      <Container style={{ width: "90%" }}>
        <div className="main_DocList-div" style={{ backgroundColor: "white" }}>
          {this.state.doctors.length === 0 ? (
            <h1>No Doctors Found</h1>
          ) : (
            this.state.doctors.map(doctors => {
              if (doctors.role === "doctor") {
                if (doctors.verified === false) {
                  return (
                    <div key={doctors.id}>
                      <DoctorApprovalCard
                        docId={doctors.id}
                        docName={doctors.name}
                        docEmail={doctors.email}
                        docSpec={doctors.specializations}
                        docLocation={
                          doctors.location_city +
                          ", " +
                          doctors.location_state +
                          ", " +
                          doctors.location_country
                        }
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

export default DoctorsApproval;
