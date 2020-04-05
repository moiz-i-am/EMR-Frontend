import React, { Component } from "react";
import ProfileCards from "./DoctorsProfileCards";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

class HospitalsList extends Component {
  state = {
    hospitals: []
  };

  componentDidMount() {
    axios.get(`v1/hospital`).then(res => {
      this.setState({ hospitals: res.data });
    });
  }

  render() {
    return (
      <Container style={{ width: "90%" }}>
        <div
          className="main_DocList-div"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          {this.state.hospitals.length === 0 ? (
            <h1>No Hospitals yet</h1>
          ) : (
            this.state.hospitals.map(hospitals => {
              return (
                <div
                  style={{ width: "60%", marginTop: "15px" }}
                  key={hospitals.id}
                >
                  <Link to={`/hosProfile/${hospitals.id}`}>
                    <ProfileCards docName={hospitals.name} />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </Container>
    );
  }
}

export default HospitalsList;
