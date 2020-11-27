import React, { Component } from "react";
import axios from "axios";
import { Container, Segment, Dimmer, Loader, Image } from "semantic-ui-react";

import PatientCard from "./PatientCard";

class PatientsListDoctors extends Component {
  state = {
    patients: [],
    id: this.props.id,
    loading: false
  };

  componentDidMount() {
    const dataForRequest = {
      doctorId: this.state.id
    };

    axios.post(`/v1/lab/patient-list-doctors`, dataForRequest).then(res => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, patients: res.data.data });
      }, 2000);
    });
  }

  render() {
    console.log(this.state.patients);

    return (
      <Container>
        <div className="main_DocList-div">
          {this.state.patients.length === 0 ? (
            this.state.loading ? null : (
              <h1>No Patients for viewing reports</h1>
            )
          ) : (
            this.state.patients.map(patient => {
              return (
                <div
                  style={{ width: "60%", marginTop: "15px" }}
                  key={patient.id}
                >
                  <PatientCard
                    id={patient.patient._id}
                    name={patient.patient.name}
                    email={patient.patient.email}
                    phone={patient.patient?.phone}
                  />
                </div>
              );
            })
          )}
        </div>
        {this.state.loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="massive">Loading</Loader>
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
      </Container>
    );
  }
}

export default PatientsListDoctors;
