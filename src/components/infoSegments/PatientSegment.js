import React, { Component } from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';

class PatientSegment extends Component {
    render() {
        return (
            <Segment basic>
                <Header icon>
                    <Icon size='large' name='user' />
                    Hundreds of users benefit daily from our system, staying healthy
                </Header>
            </Segment>
        );
    }
}

export default PatientSegment;