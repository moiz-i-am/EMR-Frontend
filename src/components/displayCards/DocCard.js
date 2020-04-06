import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

class DocCard extends Component {
    render() {
        return (
            <Card>
                <Image src={this.props.docPic} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{this.props.docName}</Card.Header>
                    <Card.Description>
                        {this.props.docLoc}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default DocCard;