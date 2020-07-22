import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { updateUserData, deleteUser } from "../../../../actions/adminActions";

class DoctorApprovalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      hId: ""
    };
  }

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken
      });
    } else {
      this.setState({
        token: ""
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {
      if (prevState.hId !== this.state.hId) {
        axios.get(`/v1/users`).then(res => {
          this.props.updateList(res.data);
        });
      }
    }, 1000);
  }

  handleClickVerify = doctorId => {
    const data = {
      verified: true
    };
    this.props.updateUserData(data, doctorId, this.state.token);
    this.setState({ hId: doctorId });
  };

  handleClickDelete = doctorId => {
    this.props.deleteUser(doctorId, this.state.token);
    this.setState({ hId: doctorId });
  };

  render() {
    return (
      <div>
        <div className="column">
          <div className="col-lg-6 col-md-6">
            <div
              className="single-generating d-flex mb-30"
              style={{
                border: "1px solid #F7F7F7",
                borderRadius: "10px",
                padding: "20px"
              }}
            >
              <div className="generating-icon">
                <span className="flaticon-chart"></span>
              </div>
              <div className="generating-cap">
                <h4>
                  {" "}
                  <span style={{ color: "black" }}>Name: </span>
                  {this.props.hosName}
                </h4>

                <p>
                  <span style={{ color: "black" }}>Email: </span>
                  {this.props.hosEmail}
                </p>
                <p>
                  <span style={{ color: "black" }}>Specializations: </span>
                  {this.props.hosSpec}
                </p>
                <p>
                  <span style={{ color: "black" }}>Location: </span>
                  {this.props.hosLocation}
                </p>

                <div>
                  <Button
                    className="btn btn-ans"
                    onClick={() => this.handleClickVerify(this.props.hosId)}
                    style={{
                      width: "40%",
                      color: "white"
                    }}
                    color="green"
                  >
                    Verify Hospital
                  </Button>
                  <Button
                    className="btn btn-ans"
                    onClick={() => this.handleClickDelete(this.props.hosId)}
                    style={{
                      width: "40%",
                      color: "white"
                    }}
                    color="red"
                  >
                    Remove Hospital
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    updateUserData: (data, id, token) =>
      dispatch(updateUserData(data, id, token)),
    deleteUser: (id, token) => dispatch(deleteUser(id, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DoctorApprovalCard));
