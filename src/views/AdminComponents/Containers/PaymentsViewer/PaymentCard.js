import React, { Component } from "react";
// import axios from "axios";
// import { Button } from "semantic-ui-react";

class PaymentCard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     file: ""
  //   };
  // }

  // openFileHandler = testId => {
  //   const postId = testId;
  //   axios
  //     .get(`/v1/uploading/doctorUpload/${postId}`)
  //     .then(res => {
  //       console.log(res.data.post);
  //       this.setState({
  //         file: "http://localhost:3001/" + res.data.post.docURL
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // componentDidUpdate() {
  //   window.open(this.state.file, "_blank"); //to open new page
  // }

  render() {
    return (
      <div>
        <div className="column">
          <div className="col-lg-6 col-md-6">
            <div
              className="single-generating d-flex mb-30"
              style={{
                border: "1px solid #C1C1C1",
                borderRadius: "10px",
                width: "180%"
              }}
            >
              <div className="generating-cap" style={{ padding: "20px" }}>
                <p>{this.props.paymentStripeId}</p>
                <p>{this.props.amount}</p>
                {/* <Button
                  basic
                  color="purple"
                  onClick={() => {
                    this.openFileHandler(this.props.documentId);
                  }}
                >
                  view file
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentCard;
