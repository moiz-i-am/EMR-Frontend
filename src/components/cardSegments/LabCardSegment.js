import React, { Component } from 'react';
import Axios from 'axios';
import { Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LabCard from '../displayCards/LabCard';

const labsToShow=[];

class LabCardSegment extends Component {
    state = {
        labs: [],
        labsList: []
    };

    componentDidMount () {
        Axios.get(`v1/lab`).then(res => {
            console.log(this.props);
            this.setState({ labs: res.data });
        });
        
        for(var i = 0; i <= 3; i++){
            const rand = Math.floor(Math.random() * this.state.labs.length);

            labsToShow.push(this.state.labs[rand]);
        }

        this.setState({ labsList: labsToShow });
    }
    render() {
        return (
          <Grid>
            <Grid.Row columns={4}>
                {this.state.labs.length === 0 ? (
                <Grid.Column>
                  <Header>No Labs Found</Header>
                </Grid.Column>
            ) : (
              this.state.labs.map(labs => {
                // if (hospitals.role === "hospital") {
                return (
                    <Grid.Column width='4' key={labs.id}>
                      <Link to={`/docProfile/${labs.id}`}>
                        <LabCard
                          labName={labs.name}
                          labpLoc={labs.location}
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

export default LabCardSegment;