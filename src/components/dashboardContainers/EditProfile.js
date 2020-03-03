import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Input,
  Image,
  Card,
  Form,
  Button,
  Label,
  TextArea
} from "semantic-ui-react";
import { connect } from "react-redux";

import { updateUserData } from "./../../actions/userDetailsAction";

class EditProfile extends Component {
  state = {
    token: "",
    id: "",
    name: "",
    email: "",
    phone: "",
    location: "wah cantt",
    discription: "",
    hos1: "shifa",
    hos2: "city",
    hos3: "quaid e azam",
    spec1: "dermotoligist",
    spec2: "skin specialist",
    spec3: "pechus system",
    mornfrom: "8:00",
    mornto: "10:00",
    evefrom: "5:00",
    eveto: "9:00"
  };

  componentDidUpdate(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("jwtToken"));
    console.log(this.documentData);
    if (localStorage.getItem("jwtToken")) {
      this.setState({
        token: this.documentData.token.accessToken,
        id: this.documentData.user.id,
        name: this.documentData.user.name,
        email: this.documentData.user.email
      });
    } else {
      this.setState({
        token: "",
        id: "",
        name: "",
        email: "",
        phone: "03214568789",
        location: "wah cantt",
        discription: "",
        hos1: "shifa",
        hos2: "city",
        hos3: "quaid e azam",
        spec1: "dermotoligist",
        spec2: "skin specialist",
        spec3: "pechus system",
        mornfrom: "8:00",
        mornto: "10:00",
        evefrom: "5:00",
        eveto: "9:00"
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    // this.props.dispatch(updateUserData(this.props.match.params.id));

    e.preventDefault();

    const upUserData = {
      name: this.state.name,
      phone: this.state.phone
    };
    //console.log(upUserData);
    if (this.props.auth.isAuthenticated) {
      this.props.updateUserData(
        upUserData,
        this.props.history,
        this.state.id,
        this.state.token
      );
    } else {
      console.log("asdasdasd");
    }
  };

  render() {
    console.log(this.state.token);
    return (
      <div className="main-view-profile-info">
        <form noValidate onSubmit={this.onSubmit}>
          <Card fluid>
            <Card.Content>
              <Grid>
                <Grid.Column width={5}>
                  <div style={{ textAlign: "center" }}>
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      size="small"
                      circular
                    />
                  </div>
                </Grid.Column>

                <Grid.Column width={6}>
                  <div
                    style={{
                      fontSize: "20px",
                      marginTop: "30px"
                    }}
                  >
                    <Input
                      name="name"
                      value={this.state.name}
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
                    {this.state.email}
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
                <Grid>
                  <Grid.Column width={5}>
                    city:{" "}
                    <Label basic color="blue">
                      {this.state.location}
                    </Label>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    state:{" "}
                    <Label basic color="blue">
                      {this.state.location}
                    </Label>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    country:{" "}
                    <Label basic color="blue">
                      {this.state.location}
                    </Label>
                  </Grid.Column>
                </Grid>
              </div>
            </Card.Content>
            <Card.Content>{this.state.discription}</Card.Content>
            <Card.Content>
              <div>
                <p>Serving Hospitals:</p>
                <Label size="huge">{this.state.hos1}</Label>
                <Label size="huge">{this.state.hos2}</Label>
                <Label size="huge">{this.state.hos3}</Label>
              </div>
              <div>
                <p>Specialization:</p>
                <Label size="huge">{this.state.spec1}</Label>
                <Label size="huge">{this.state.spec2}</Label>
                <Label size="huge">{this.state.spec3}</Label>
              </div>
              <div>
                <p>Time Availability:</p>
                <div>
                  Morning:
                  <Label basic color="blue">
                    {this.state.mornfrom}
                  </Label>
                  <Label basic color="red">
                    {this.state.mornto}
                  </Label>
                </div>
                <div>
                  Evening:
                  <Label basic color="blue">
                    {this.state.mornfrom}
                  </Label>
                  <Label basic color="red">
                    {this.state.mornto}
                  </Label>
                </div>
              </div>
            </Card.Content>
            <Card.Content textAlign="left">
              <Button color="red">Cancel</Button>
              <Button type="submit" color="blue">
                Update
              </Button>
            </Card.Content>
          </Card>
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  updateUserData: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, {
  updateUserData
})(EditProfile);
