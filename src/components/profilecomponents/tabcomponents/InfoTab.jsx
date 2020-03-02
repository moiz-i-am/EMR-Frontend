import React, { Component } from "react";
import { Item, Icon, Grid, Divider, List, Button } from "semantic-ui-react";

class InfoTab extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={5}>
          <Item.Group>
            <Icon name="marker" />
            <span>placeholder Location...</span>
          </Item.Group>
        </Grid.Column>
        <Divider vertical />
        <Grid.Column width={6}>
          <Item.Group>
            <Icon name="time" />
            <span>placeholder available days...</span>
            <List animated bulleted divided verticalAlign="middle">
              <List.Item content="placeholder time..." />
              <List.Item content="placeholder time..." />
              <List.Item content="placeholder time..." />
            </List>
          </Item.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

export default InfoTab;
