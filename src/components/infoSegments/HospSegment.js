import React, { Component } from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';

class HospSegment extends Component {
    render() {
        return (
            <Segment basic>
                <Header icon>
                    <Icon name='hospital' size='large'/>
                    High Standard, Highly regarded hospitals are affiliated with us
                </Header>
            </Segment>
        );
    }
}

export default HospSegment;