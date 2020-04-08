import React, { Component } from "react";
import { Card, Image, Rating } from "semantic-ui-react";

class DocCard extends Component {
  render() {
    return (
      <Card>
        <Image
          src="https://react.semantic-ui.com/images/wireframe/square-image.png"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{this.props.docName}</Card.Header>
          <Card.Description>{this.props.docLoc}</Card.Description>
          <Card.Description>
            <Rating
              maxRating={5}
              defaultRating={3}
              disabled
              icon="star"
              size="huge"
            />
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default DocCard;
