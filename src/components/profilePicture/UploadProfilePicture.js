import React, { Component } from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

class UploadProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(event.target.files[0]);
  };

  onClickHandler = () => {
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    formData.append("userId", this.props.userId);

    axios.post("/v1/uploading/profilePicture", formData).then(res => {
      console.log(res.data);
    });
  };

  render() {
    console.log("asjgdgajs: " + this.props.userId);
    return (
      <div style={{ textAlign: "center", padding: "25px" }}>
        <input
          id="myInput"
          type="file"
          accept=".jpg, .png, .jpeg|image/*"
          onChange={this.onChangeHandler}
        />

        <Button
          color="teal"
          icon="cloud upload"
          content="Upload file"
          onClick={() => this.onClickHandler()}
        />
      </div>
    );
  }
}

export default UploadProfilePicture;
