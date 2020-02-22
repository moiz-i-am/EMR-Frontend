import React, { Component } from "react";
import ProfileCards from "./DoctorsProfileCards";
import axios from "axios";

const nam = "moiz";
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
          this.state.persons.map(persons => (
            <div style={{ width: "70%" }} key={persons.id}>
              <a href={`/docProfile/${persons.id}`}>
                <ProfileCards docName={persons.name} docEmail={persons.email} />
              </a>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default DoctorsList;
