import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import axios from "axios";

class UploadLabTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      denyUpload: false,
      success: false
    };
  }

  getFileExtension = async filename => {
    return await filename.split(".").pop();
  };

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(event.target.files[0]);
  };

  handleClose = () => this.setState({ denyUpload: false });

  onClickHandler = async () => {
    const fileExtension = await this.getFileExtension(
      this.state.selectedFile?.name
    );

    console.log(fileExtension);

    if (fileExtension !== "pdf") {
      this.setState({ denyUpload: true });
      setTimeout(() => {
        this.setState({ denyUpload: false });
      }, 3000);
      return;
    }

    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    formData.append("labId", this.props.labId);
    formData.append("userId", this.props.userId);

    axios.post("/v1/uploading/labUpload", formData).then(res => {
      this.props.successMessage();
      this.props.successTimeout();
      this.props.closeModal();
    });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: "center", padding: "25px" }}>
          <input
            id="myInput"
            type="file"
            accept="application/pdf"
            onChange={this.onChangeHandler}
          />
          <Button
            color="teal"
            icon="cloud upload"
            content="Upload file"
            onClick={() => this.onClickHandler()}
          />
        </div>

        <div style={{ position: "absolute" }}>
          {this.state.denyUpload ? (
            <div
              style={{
                left: 0,
                position: "fixed",
                bottom: 0,
                zIndex: 1000
              }}
            >
              <Message
                color="red"
                onDismiss={this.handleClose}
                header="Only Pdf files are allowed"
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default UploadLabTests;
