import React, { Component } from "react";
import { Card, Image, Rating, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class DocCard extends Component {
  render() {
    return (
      <Card>
        <Image
          src="https://react.semantic-ui.com/images/wireframe/square-image.png"
          wrapped
          ui={false}
          size="small"
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
          <Card.Description>
            <Link to={`/docProfile/${this.props.docId}`}>
              <Button>See Details</Button>
            </Link>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default DocCard;
