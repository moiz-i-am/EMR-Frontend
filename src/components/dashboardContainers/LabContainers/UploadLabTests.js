import React, { Component } from "react";
// import { Button } from "semantic-ui-react";

class UploadLabTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
      //url: 'http://localhost:3000/upload'
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
    const data = new FormData();
    data.append("file", this.state.selectedFile);

    // axios.post(this.state.url, data, {

    // }).then(res => {
    //   console.log(res.data);
    // })
  };

  render() {
    return (
      <div style={{ textAlign: "center", padding: "25px" }}>
        <input
          id="myInput"
          type="file"
          //accept=".jpg, .png, .jpeg|image/*"
          onChange={this.onChangeHandler}
        />

        {/* <Button
          color="teal"
          icon="cloud upload"
          content="Upload file"
          onClick={() => this.onChangeHandler}
        /> */}
      </div>
    );
  }
}

export default UploadLabTests;
