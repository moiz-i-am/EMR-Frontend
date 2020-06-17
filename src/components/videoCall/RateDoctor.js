import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Button, Header, Icon, Modal, Rating } from "semantic-ui-react";

import { updateRatingData } from "../../actions/userDetailsAction";

class RateDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: true, redirect: false };
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    this.setState({ modalOpen: false });
    const updateRating = {
      rating: this.state.rating
    };

    this.props.updateRatingData(updateRating, this.props.partnerId);

    this.setState({ redirect: true });
  };

  handleRate = (e, { rating }) => this.setState({ rating });

  render() {
    console.log(this.state.rating);
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
