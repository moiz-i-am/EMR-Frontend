import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import "../../styles/notes.style.css";

class SyncingPrescriptionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSocket: this.props.currentSocket,
      partnerSocketId: this.props.partnerSocketId,
      role: "",
      value: "",
      data: ""
    };
    this.socket = {};
  }

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        role: this.documentData.user.role
      });
    } else {
      this.setState({
        role: ""
      });
    }

    this.state.currentSocket.on("new-remote-operations", ops => {
      let hello = JSON.stringify(ops.ops);

      const result = hello.replace(/"\\"|\\""/gi, "");
      const finalText = result.replace(/\\\\n/g, "\n");

      this.editor.textContent = finalText;
    });
  }

  handleChange = event => {
    this.state.currentSocket.emit("new-operations", {
      partnerId: this.state.partnerSocketId,
      ops: JSON.stringify(this.state.value)
    });

    this.setState({ value: event.target.value });
  };

  render() {
    console.log("data: " + this.state.data);
    return (
      <div>
        {this.state.role === "doctor" ? (
          <div>
            <h3 style={{ backgroundColor: "#faed86", textAlign: "center" }}>
              Write a prescription
            </h3>

            <textarea
              ref={ref => {
                this.editor = ref;
              }}
              className="notes"
              value={this.state.value}
              onChange={this.handleChange}
            ></textarea>

            <div style={{ textAlign: "right", marginRight: "20px" }}>
              <Button color="yellow">Save</Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ backgroundColor: "#faed86", textAlign: "center" }}>
              prescription
            </h3>

            <textarea
              ref={ref => {
                this.editor = ref;
              }}
              className="notes"
              readOnly
            ></textarea>
          </div>
        )}
      </div>
    );
  }
}

export default SyncingPrescriptionEditor;
