import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

import logo from "../../../../assets/L.png";

class DoctorCard extends Component {
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
                <h4> {this.props.patientName}</h4>

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
                      backgroundColor: "#fff"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <img
                          style={{ width: "50%" }}
                          src={logo}
                          alt="Company Logo"
                        />
                      </div>
                      <div style={{ width: "50%" }}>
                        <p style={{ fontSize: "14px" }}>
                          phone: <span>0334-5959007</span>
                        </p>
                        <p style={{ fontSize: "14px" }}>
                          email: <span>health-e@gmail.com</span>
                        </p>
                      </div>
                    </div>
                  </Modal.Header>
                  <Modal.Description>
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#fff",
                        borderBottom: "1px solid black"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px"
                        }}
                      >
                        <div>
                          <div style={{ padding: "5px" }}>
                            <span
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                            >
                              {this.props.doctorName}
                            </span>
                          </div>
                          <p style={{ margin: 0, textAlignLast: "right" }}>
                            (heart Specialist)
                          </p>
                          <p style={{ margin: 0, textAlignLast: "right" }}>
                            Nescom Hospital, Islamabad
                          </p>
                        </div>
                        <div>{new Date(this.props.date).toDateString()}</div>
                      </div>
                    </div>
                  </Modal.Description>
                  <Modal.Description>
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#fff",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "10px"
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          width: "50%",
                          border: "1px solid #ccc",
                          borderRadius: 10
                        }}
                      >
                        <div style={{ padding: "5px" }}>
                          <span style={{ fontWeight: "bold" }}>
                            Patient Name:{" "}
                          </span>
                          <span style={{ fontWeight: "bold" }}>
                            {this.props.patientName}
                          </span>
                        </div>

                        <div style={{ padding: "5px" }}>
                          <span>DOB: </span>
                          <span>Nov 25 1998</span>
                        </div>
                        <div style={{ padding: "5px" }}>
                          <span>Date: </span>
                          <span>
                            {new Date(this.props.date).toDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Modal.Description>
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

export default DoctorCard;
