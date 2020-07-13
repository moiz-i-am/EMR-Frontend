import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Input,
  Card,
  Button,
  Confirm,
  Message,
  Divider
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Image from "../../profilePicture/Image";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { updateUserData, deleteUser } from "../../../actions/userDetailsAction";

import UploadProfilePicture from "../../profilePicture/UploadProfilePicture";

class EditProfilePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      token: "",
      id: "",
      name: "",
      email: "",
      phone: this.props.userData.phone,
      location_city: this.props.userData.location_city,
      location_state: this.props.userData.location_state,
      location_country: this.props.userData.location_country,
      discription: "",
      image: "",
      open: false,
      openPictureUpload: false
    };
  }

  componentDidUpdate(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken,
        id: this.documentData.user.id,
        name: this.documentData.user.name
      });
    } else {
      this.setState({
        token: "",
        id: ""
      });
    }

    const userId = this.props.match.params.id;

    axios
      .get(`/v1/uploading/profilePicture/${userId}`)
      .then(res => {
        console.log(res.data.post);
        this.setState({
          image: "http://localhost:3001/" + res.data.post.imageURL
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  show = () => this.setState({ open: true });

  handleConfirm = () => {
    this.setState({ open: false });
    if (this.props.auth.isAuthenticated) {
      this.props.deleteUser(
        // change id to (this.props.match.params.id)
        this.state.id,
        this.state.token
      );
      this.props.auth.isAuthenticated = false;
      localStorage.removeItem("jwtToken");
      this.props.history.push("/");
    } else {
      console.log("asdasdasd");
    }
  };

  handleConfirmSchedule = () => this.setState({ open2: false });

  handleCancel = () => this.setState({ open: false });

  showPictureUpload = () => this.setState({ openPictureUpload: true });

  handleConfirmPictureUpload = () => {
    this.setState({ openPictureUpload: false });
  };

  handleCancelPictureUpload = () => this.setState({ openPictureUpload: false });

  renderConfirmationPictureUpload() {
    return <UploadProfilePicture userId={this.props.match.params.id} />;
  }

  onSubmit = e => {
    e.preventDefault();

    const upUserData = {
      name: this.state.name,
      phone: this.state.phone,
      location_city: this.state.location_city,
      location_state: this.state.location_state,
      location_country: this.state.location_country
    };
    if (this.props.auth.isAuthenticated) {
      this.props.updateUserData(
        upUserData,
        this.props.history,
        // change id to (this.props.match.params.id)
        this.state.id,
        this.state.token
      );
    } else {
      console.log("not logged in");
    }
  };

  renderAlert() {
    return (
      <div>
        <Message color="red">Red</Message>;
      </div>
    );
  }

  render() {
    return (
      <div className="main-view-profile-info">
        <Card fluid>
          <Card.Content>
            <Grid stackable>
              <Grid.Column width={5}>
                <Image contain fileURL={this.state.image} />
                <Button
                  onClick={() => this.showPictureUpload()}
                  style={{ contentAllign: "center" }}
                >
                  Update Picture
                </Button>
                <Confirm
                  open={this.state.openPictureUpload}
                  content={this.renderConfirmationPictureUpload()}
                  header="Upload Picture"
                  onCancel={this.handleCancelPictureUpload}
                  onConfirm={this.handleConfirmPictureUpload}
                  size="small"
                />
              </Grid.Column>

              <Grid.Column width={6}>
                <div
                  style={{
                    fontSize: "20px",
                    marginTop: "30px"
                  }}
                >
                  <Input
                    name="uname"
                    value={this.state.userData.name}
                    onChange={this.onChange}
                  />
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "normal",
                    marginTop: "15px",
                    color: "#37B6AD"
                  }}
                >
                  {this.state.userData.email}
                </div>
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "normal",
                marginTop: "15px"
              }}
            >
              <span>Phone No.</span>
              <Input
                name="phone"
                value={this.state.phone}
                onChange={this.onChange}
              />
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "normal",
                marginTop: "15px"
              }}
            >
              <Grid stackable>
                <Grid.Column width={5}>
                  city:{" "}
                  <Input
                    name="location_city"
                    value={this.state.location_city}
                    onChange={this.onChange}
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  state:{" "}
                  <Input
                    name="location_state"
                    value={this.state.location_state}
                    onChange={this.onChange}
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  country:{" "}
                  <Input
                    name="location_country"
                    value={this.state.location_country}
                    onChange={this.onChange}
                  />
                </Grid.Column>
              </Grid>
            </div>
          </Card.Content>
          <Card.Content>{this.state.discription}</Card.Content>

          <Card.Content textAlign="right">
            <Divider horizontal />
            <Button onClick={this.show} color="red">
              Delete Account
            </Button>
            <Confirm
              content="Are you sure you want to delete your profile?"
              open={this.state.open}
              header="Delete Alert"
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
            />
            <Button type="submit" color="blue" onClick={this.onSubmit}>
              Update
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
EditProfilePatient.propTypes = {
  updateUserData: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
};

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
    updateUserData: (user, history, id, token) =>
      dispatch(updateUserData(user, history, id, token)),
    deleteUser: (id, token) => dispatch(deleteUser(id, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfilePatient));
