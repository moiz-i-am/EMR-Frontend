import React, { Component } from "react";
import Axios from "axios";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DocCard from "../displayCards/DocCard";

var size = 4;

class DocCardSegment extends Component {
  state = {
    doctors: [],
    doctorsList: []
  };

  componentDidMount() {
    Axios.get(`v1/users`).then(res => {
      console.log(this.props);
      const doctors = res.data.filter(function(doc) {
        return doc.role == "doctor";
      });
      this.setState({ doctors: doctors });
    });
  }

  render() {
    console.log(this.state.doctors);
    return (
      <Grid className="main_DocList-div" stackable>
        <Grid.Row columns={4}>
          {this.state.doctors.length === 0 ? (
            <h1>No Doctors Found</h1>
          ) : (
            this.state.doctors.slice(0, size).map(doctors => {
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
