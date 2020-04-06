import React, { Component } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

class DocSegment extends Component {
    render() {
        return (
            <Segment basic>
                <Header icon>
                    <Icon name='doctor' size='large'/>
                    Professional Doctors available at one click, all time, everytime
                </Header>
            </Segment>
        );
    }
}

export default DocSegment;