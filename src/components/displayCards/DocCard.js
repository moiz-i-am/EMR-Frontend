import React, { Component } from "react";
import { Card, Rating, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

import Image from "../profilePicture/Image";

class DocCard extends Component {
  state = {
    image: ""
  };

  componentDidMount() {
    const userId = this.props.docId;
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

  render() {
    return (
      <Card>
        {/* <Image
          src="https://react.semantic-ui.com/images/wireframe/square-image.png"
          wrapped
          ui={false}
          size="small"
        /> */}
        <Image contain fileURL={this.state.image} />
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
              <Button
                style={{
                  backgroundColor: "#990099",
                  color: "#FFFFFF",
                  marginTop: "15px"
                }}
              >
                See Details
              </Button>
            </Link>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default DocCard;
