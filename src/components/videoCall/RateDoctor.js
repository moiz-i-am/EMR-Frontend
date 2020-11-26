import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import {
  Button,
  Header,
  Icon,
  Modal,
  Rating,
  Form,
  TextArea
} from "semantic-ui-react";

import { updateRatingData } from "../../actions/userDetailsAction";
import { saveDoctorsFeedback } from "../../actions/feedbackActions";

class RateDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      redirect: false,
      comment: "",
      patientName: this.props.patientName
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = async () => {
    this.setState({ modalOpen: false });
    const updateRating = {
      rating: this.state.rating
    };

    const feedbackData = {
      doctorId: this.props.partnerId,
      patientName: this.state.patientName,
      comment: this.state.comment
    };

    try {
      const saveFeedback = await saveDoctorsFeedback(feedbackData);

      console.log(saveFeedback);

      this.props.updateRatingData(updateRating, this.props.partnerId);

      this.setState({ redirect: true });
    } catch (error) {
      alert(error.message);
    }
  };

  handleRate = (e, { rating }) => this.setState({ rating });

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.state.rating);
    console.log(this.state.comment);

    if (this.state.redirect) {
      return <Redirect push to={`/dashboard/${this.props.myId}`} />;
    }
    return (
      <Modal
        open={this.state.modalOpen}
        //onClose={this.handleClose}
        size="small"
      >
        <Header icon="star" content="Rate this doctor" />
        <Modal.Content>
          <div style={{ textAlign: "center" }}>
            <Rating
              maxRating={5}
              onRate={this.handleRate}
              size="huge"
              icon="star"
            />
          </div>
        </Modal.Content>
        <Modal.Content>
          <Form>
            <TextArea
              placeholder="Your review about doctor..."
              name="comment"
              onChange={this.onChange}
              value={this.state.comment}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

//export default RateDoctor;

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    updateRatingData: (data, id) => dispatch(updateRatingData(data, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RateDoctor));
