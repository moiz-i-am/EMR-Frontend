import React, { Component } from "react";
import ProfileCards from "./DoctorsProfileCards";
import axios from "axios";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    filteredData: []
  };

  componentDidMount() {
    switch (this.props.location.state.category) {
      case "Doctor":
        axios.get(`v1/users`).then(res => {
          console.log(this.props);
          this.setState({ filteredData: res.data });
        });
        break;
      case "Hospital":
        axios.get(`v1/hospital`).then(res => {
          console.log(res.data);
          this.setState({ filteredData: res.data });
        });
        break;
      case "Labs":
        axios.get(`v1/lab`).then(res => {
          console.log(this.props);
          this.setState({ filteredData: res.data });
        });
        break;
      default:
        axios.get(`v1/users`).then(res => {
          console.log(this.props);
          this.setState({ filteredData: res.data });
        });
    }
  }

  render() {
    return (
      <div className="main_DocList-div">
        {this.state.filteredData.length === 0 ? (
          <h1>No Data Found</h1>
        ) : (
          this.state.filteredData.map(filteredData => {
            if (
              filteredData.role === "doctor" &&
              this.props.location.state.name === filteredData.name
            ) {
              return (
                <div style={{ width: "70%" }} key={filteredData.id}>
                  <Link to={`/docProfile/${filteredData.id}`}>
                    <ProfileCards
                      docName={filteredData.name}
                      docEmail={filteredData.email}
                      docSpec={filteredData.specializations}
                    />
                  </Link>
                </div>
              );
            } else if (
              filteredData.role === "hospital" &&
              this.props.location.state.name === filteredData.name
            ) {
            } else if (
              filteredData.role === "labs" &&
              this.props.location.state.name === filteredData.name
            ) {
            }
          })
        )}
      </div>
    );
  }
}

export default Search;
