import React, { Component } from "react";
import ProfileCards from "./DoctorsProfileCards";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

class DoctorsList extends Component {
  state = {
    persons: []
  };

  componentDidMount() {
    axios.get(`v1/users`).then(res => {
      this.setState({ persons: res.data });
    });
  }

  render() {
    return (
      <Container style={{ width: "90%" }}>
        <div
          className="main_DocList-div"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          {this.state.persons.length === 0 ? (
            <h1>No Doctors Found</h1>
          ) : (
            this.state.persons.map(persons => {
              if (persons.role === "doctor") {
                return (
                  <div
                    style={{ width: "60%", marginTop: "15px" }}
                    key={persons.id}
                  >
                    <Link to={`/docProfile/${persons.id}`}>
                      <ProfileCards
                        docName={persons.name}
                        docEmail={persons.email}
                        docSpec={persons.specializations}
                        docLocation={
                          persons.location_city +
                          ", " +
                          persons.location_state +
                          ", " +
                          persons.location_country
                        }
                      />
                    </Link>
                  </div>
                );
              }
            })
          )}
        </div>
      </Container>
    );
  }
}

export default DoctorsList;
