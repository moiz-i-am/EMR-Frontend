import React, { Component } from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';

class LabSegment extends Component {
    render() {
        return (
            <Segment basic>
                <Header icon>
                    <Icon size='large' name='lab' />
                    Professional and go-to laboratories that are near to your place
                </Header>
            </Segment>
        );
    }
}

export default LabSegment;