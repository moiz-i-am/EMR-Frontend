import React, { Component } from "react";
import axios from "axios";
import {
  Segment,
  Dimmer,
  Loader,
  Image,
  Button,
  Icon
} from "semantic-ui-react";

import PatientCard from "../PrescriptionCards/PatientCard";

class PrescriptionPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      prescriptions: [],
      loading: false
    };
  }

  componentDidMount() {
    const data = {
      patientId: this.state.id
    };
    axios.post(`/v1/prescription/patient`, data).then(res => {
      this.setState({ loading: true });
      const d = JSON.stringify(res.data);
      console.log(d);
      setTimeout(() => {
        this.setState({ loading: false, prescriptions: res.data });
      }, 2000);
    });
  }

  render() {
    console.log(this.state.id + " " + this.state.prescriptions);
    return (
      <div>
        <div className="generating-area ">
          <div className="container">
            <div className="rows d-flex justify-content-center">
              <div className="col-lg-8">
                <div className="section-tittle text-center">
                  <h2> Your Prescriptions </h2>
                </div>
              </div>
            </div>
            {this.state.prescriptions.length === 0 ? (
              <h3>Sorry You have no prescriptions yet!</h3>
            ) : (
              this.state.prescriptions.map(prescription => {
                return (
                  <div key={prescription.id}>
                    <PatientCard
                      date={prescription.date}
                      doctorName={prescription.doctorName}
                      prescriptionText={prescription.prescriptionText}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {this.state.loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="massive">Loading</Loader>
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
      </div>
    );
  }
}

export default PrescriptionPatient;