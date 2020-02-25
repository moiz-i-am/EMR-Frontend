import React, { Component } from "react";
import ProfileCards from "./DoctorsProfileCards";
import axios from "axios";
import { Link } from "react-router-dom";

class DoctorsList extends Component {
  state = {
    persons: []
  };

  componentDidMount() {
    axios.get(`v1/users`).then(res => {
      console.log(res);
      this.setState({ persons: res.data });
    });
  }

  render() {
    return (
      <div className="main_DocList-div">
        {this.state.persons.length === 0 ? (
          <h1>No Doctors Found</h1>
        ) : (
          this.state.persons.map(persons => {
            if (persons.role === "doctor") {
              return (
                <div style={{ width: "70%" }} key={persons.id}>
                  <Link to={`/docProfile/${persons.id}`}>
                    <ProfileCards
                      docName={persons.name}
                      docEmail={persons.email}
                    />
                  </Link>
                </div>
              );
            }
          })
        )}
      </div>
    );
  }
}

export default DoctorsList;
