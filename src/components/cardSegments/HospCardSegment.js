import React, { Component } from "react";
import Axios from "axios";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import HospCard from "../displayCards/HospCard";

const hospitalsToShow = [];

class HospCardSegment extends Component {
  state = {
    hospitals: [],
    hospitalsList: []
  };

  componentDidMount() {
    Axios.get(`v1/hospital`).then(res => {
      console.log(this.props);
      this.setState({ hospitals: res.data });
    });

    for (var i = 0; i <= 3; i++) {
      const rand = Math.floor(Math.random() * this.state.hospitals.length);

      hospitalsToShow.push(this.state.hospitals[rand]);
    }

    this.setState({ hospitalsList: hospitalsToShow });
  }
  render() {
    return (
      <Grid stackable>
        <Grid.Row columns={4}>
          {this.state.hospitals.length === 0 ? (
            <Grid.Column>
              <Header>No Hospitals Found</Header>
            </Grid.Column>
          ) : (
            this.state.hospitals.map(hospitals => {
              // if (hospitals.role === "hospital") {
              return (
                <Grid.Column width="4" key={hospitals.id}>
                  <Link to={`/docProfile/${hospitals.id}`}>
                    <HospCard
                      hospName={hospitals.name}
                      hospLoc={hospitals.location}
                    />
                  </Link>
                </Grid.Column>
              );
              //}
            })
          )}
        </Grid.Row>
      </Grid>
    );
  }
}

export default HospCardSegment;
