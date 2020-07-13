import React, { Component } from "react";
import axios from "axios";
import { Container, Segment, Dimmer, Loader, Image } from "semantic-ui-react";

import TestResultCard from "./TestResultCard";

class UploadedTestsList extends Component {
  state = {
    tests: [],
    loading: false
  };

  componentDidMount() {
    axios.get(`/v1/uploading/testResultsLab/${this.props.id}`).then(res => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, tests: res.data.posts });
      }, 2000);
    });
  }

  render() {
    return (
      <Container>
        <div className="main_DocList-div">
          {this.state.tests.length === 0 ? (
            this.state.loading ? null : (
              <h1>No test results uploaded yet</h1>
            )
          ) : (
            this.state.tests.map(tests => {
              return (
                <div style={{ width: "60%", marginTop: "15px" }} key={tests.id}>
                  <TestResultCard
                    testId={tests._id}
                    file={tests.fileURL}
                    userId={tests.userId}
                  />
                </div>
              );
            })
          )}
        </div>
        {this.state.loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="massive">Loading</Loader>
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
      </Container>
    );
  }
}

export default UploadedTestsList;
