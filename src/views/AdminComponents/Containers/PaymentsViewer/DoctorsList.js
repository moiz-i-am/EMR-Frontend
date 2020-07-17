import React, { Component } from "react";
import axios from "axios";
import { Container, Segment, Dimmer, Loader, Image } from "semantic-ui-react";

import DoctorCardsPayment from "./DoctorCardsPayment";

class DoctorsList extends Component {
  state = {
    persons: [],
    loading: false
  };

  componentDidMount() {
    axios.get(`/v1/users`).then(res => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, persons: res.data });
      }, 2000);
    });
  }

  render() {
    return (
      <Container>
        <div className="main_DocList-div">
          {this.state.persons.length === 0 ? (
            this.state.loading ? null : (
              <h1>No Doctors Found</h1>
            )
          ) : (
            this.state.persons.map(persons => {
              if (persons.role === "doctor") {
                return (
                  <div
                    style={{ width: "60%", marginTop: "15px" }}
                    key={persons.id}
                  >
                    {/* <Link to={`/docProfile/${persons.id}`}> */}
                    <DoctorCardsPayment
                      id={this.props.id}
                      DId={persons.id}
                      DName={persons.name}
                      DEmail={persons.email}
                    />
                    {/* </Link> */}
                  </div>
                );
              }
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

export default DoctorsList;
