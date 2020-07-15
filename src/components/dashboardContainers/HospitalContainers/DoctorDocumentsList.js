import React, { Component } from "react";
import axios from "axios";
import { Container, Segment, Dimmer, Loader, Image } from "semantic-ui-react";

import DoctorDocuments from "./DoctorDocuments";

class DoctorDocumentsList extends Component {
  state = {
    documents: [],
    loading: false
  };

  componentDidMount() {
    axios
      .get(`/v1/uploading/docsUploadlistDoctor/${this.props.docId}`)
      .then(res => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, documents: res.data.posts });
        }, 2000);
      });
  }

  render() {
    return (
      <Container>
        <div className="main_DocList-div">
          {this.state.documents.length === 0 ? (
            this.state.loading ? null : (
              <h1>No Documents uploaded yet</h1>
            )
          ) : (
            this.state.documents.map(document => {
              return (
                <div
                  style={{ width: "60%", marginTop: "15px" }}
                  key={document.id}
                >
                  <DoctorDocuments
                    documentId={document._id}
                    file={document.docURL}
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

export default DoctorDocumentsList;
