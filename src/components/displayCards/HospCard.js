import React, { Component } from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';

class HospCard extends Component {
    render() {
        return (
            <Segment textAlign='center' size='large' >
                <Header>
                    {this.props.hospName}
                </Header>
                <Divider />
                    {this.props.hospLoc}
            </Segment>
        );
    }
}

export default HospCard;