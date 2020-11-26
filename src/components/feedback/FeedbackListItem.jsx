import React, { Component } from "react";
import { Feed, Image } from "semantic-ui-react";

class FeedbackListItem extends Component {
  render() {
    const { feedback } = this.props;
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Image avatar size="small" src={feedback.pic} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{feedback.patientName}</Feed.User>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Content>{feedback.comment}</Feed.Content>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    );
  }
}

export default FeedbackListItem;
