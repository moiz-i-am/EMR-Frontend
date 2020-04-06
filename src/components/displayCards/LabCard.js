import React, { Component } from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';

class LabCard extends Component {
    render() {
        return (
            <Segment textAlign='center' size='large' >
                <Header>
                    {this.props.labName}
                </Header>
                <Divider />
                    {this.props.labLoc}
            </Segment>
        );
    }
}

export default LabCard;