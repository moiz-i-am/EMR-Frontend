import React, { Component } from "react";
import { Confirm } from "semantic-ui-react";
import axios from "axios";

import PaymentsList from "./PaymentsList";

class DoctorCardsPayment extends Component {
  state = {
    open: false
  };

  show = () => this.setState({ open: true });

  handleConfirm = () => {
    this.setState({ open: false });
  };

  handleCancel = () => this.setState({ open: false });

  renderConfirmation() {
    return <PaymentsList docId={this.props.DId} />;
  }

  render() {
    return (
      <div>
        <div className="column" onClick={this.show}>
          <div className="col-lg-6 col-md-6">
            <div
              className="single-generating d-flex mb-30"
              style={{
                border: "1px solid #C1C1C1",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              <div className="generating-cap" style={{ padding: "20px" }}>
                <h4> {this.props.DName} </h4>
                <p>{this.props.DEmail}</p>
              </div>
            </div>
          </div>
        </div>
        <Confirm
          open={this.state.open}
          content={this.renderConfirmation()}
          header="Payment List"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          size="small"
        />
      </div>
    );
  }
}

export default DoctorCardsPayment;
