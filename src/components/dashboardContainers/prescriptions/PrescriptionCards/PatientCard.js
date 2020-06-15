import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class PatientCard extends Component {
  render() {
    return (
      <div>
        <div className="column">
          <div className="col-lg-6 col-md-6">
            <div className="single-generating d-flex mb-30">
              <div className="generating-icon">
                <span className="flaticon-chart"></span>
              </div>
              <div className="generating-cap">
                <h4> {this.props.doctorName}</h4>

                <p>
                  <span style={{ color: "black" }}>Date: </span>
                  {new Date(this.props.date).toDateString()}
                </p>

                <p
                  style={{
                    whiteSpace: "nowrap",
                    width: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {this.props.prescriptionText}
                </p>

                <Modal
                  style={{ backgroundColor: "#faed86" }}
                  size={"small"}
                  trigger={
                    <Button
                      style={{ backgroundColor: "#9458AE", color: "#fff" }}
                    >
                      Read Detailed
                    </Button>
                  }
                >
                  <Modal.Header
                    style={{
                      backgroundColor: "#663411",
                      color: "#fff"
                    }}
                  >
                    {this.props.doctorName}
                  </Modal.Header>
                  <Modal.Description>
                    <textarea className="notes" readOnly>
                      {this.props.prescriptionText}
                    </textarea>
                  </Modal.Description>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientCard;
