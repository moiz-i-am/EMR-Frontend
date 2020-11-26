import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import FeedbackList from "./../components/feedback/FeedbackList";

import { getDoctorFeedbacks } from "./../actions/feedbackActions";

let feedbacksFromTab = [];

const panes = [
  {
    menuItem: "Feedback",
    render: () => (
      <Tab.Pane>
        <FeedbackList feedbacks={feedbacksFromTab} />
      </Tab.Pane>
    )
  }
];

class TabbedSection extends Component {
  getFeedbacks = async doctorId => {
    try {
      const feedbacks = await getDoctorFeedbacks(doctorId);

      console.log(feedbacks);

      feedbacksFromTab = feedbacks;
    } catch (error) {}
  };

  componentDidMount() {
    this.getFeedbacks(this.props.docId);
  }

  render() {
    console.log(feedbacksFromTab);

    return <Tab renderActiveOnly={true} panes={panes} />;
  }
}

export default TabbedSection;
