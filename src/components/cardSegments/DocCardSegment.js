import React, { Component } from "react";
import Axios from "axios";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DocCard from "../displayCards/DocCard";

const doctorsToShow = [];

class DocCardSegment extends Component {
  state = {
    doctors: [],
    doctorsList: []
  };

  componentDidMount() {
    Axios.get(`v1/users`).then(res => {
      console.log(this.props);
      this.setState({ doctors: res.data });
    });

    for (var i = 0; i <= 3; i++) {
      const rand = this.state.doctors[
        Math.floor(Math.random() * this.state.doctors.length)
      ];

      doctorsToShow.push(rand);
    }

    this.setState({ doctorsList: doctorsToShow });
  }

  render() {
    return (
      <Grid className="main_DocList-div" stackable>
        <Grid.Row columns={4}>
          {this.state.doctors.length === 0 ? (
            <h1>No Doctors Found</h1>
          ) : (
            this.state.doctors.map(doctors => {
              if (doctors.role === "doctor") {
                return (
                  <Grid.Column width="4" key={doctors.id}>
                    {/* <Link to={`/docProfile/${doctors.id}`}> */}
                    <DocCard
                      docId={doctors.id}
                      docName={doctors.name}
                      docPic={doctors.picture}
                      docLoc={
                        doctors.location_city +
                        ", " +
                        doctors.location_state +
                        ", " +
                        doctors.location_country
                      }
                    />
                    {/* </Link> */}
                  </Grid.Column>
                );
              }
            })
          )}
        </Grid.Row>
      </Grid>
    );
  }
}

export default DocCardSegment;
