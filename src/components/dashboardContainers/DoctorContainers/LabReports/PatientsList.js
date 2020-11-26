import React, { Component } from "react";
import axios from "axios";
import { Container, Segment, Dimmer, Loader, Image } from "semantic-ui-react";

// import PaymentCard from "./PaymentCard";

class PatientsListDoctors extends Component {
  state = {
    patients: [],
    loading: false
  };

  componentDidMount() {
    axios.get(`/v1/payment/paymentsList/${this.props.id}`).then(res => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, patients: res.data.payments });
        // console.log(res.data.patients);
      }, 2000);
    });
  }

  render() {
    return (
      <Container>
        <div className="main_DocList-div">
          {this.state.patients.length === 0 ? (
            this.state.loading ? null : (
              <h1>No Patients for viewing reports</h1>
            )
          ) : (
            this.state.patients.map(payment => {
              return (
                <div
                  style={{ width: "60%", marginTop: "15px" }}
                  key={payment.id}
                >
                  {/* <PaymentCard
                    patientstripeId={payment.paymentId}
                    amount={payment.amount}
                  /> */}
                  helo
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
