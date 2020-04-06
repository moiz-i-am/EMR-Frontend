import React from "react";
import { Grid, List, Header, Icon, Button } from "semantic-ui-react";

const footer = () => {
  return (
    <Grid padded='horizontally' textAlign='center'>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Header sub>About</Header>
          <List link>
            <List.Item as='a'>Privacy Policy</List.Item>
            <List.Item as='a'>Terms of Service</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column>
          <Header sub>Community</Header>
            <List link>
              <List.Item as='a'>Become an Affiliate</List.Item>
              <List.Item as='a'>Doctors</List.Item>
              <List.Item as='a'>Hospitals</List.Item>
              <List.Item as='a'>Laboratries</List.Item>
          </List>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={"equal"}>
        <Grid.Column style={{marginTop: '10px'}}>
          <Header disabled sub floated='left'>
            <Icon name='copyright outline' />
            <Header.Content>Health-E</Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column textAlign='right' floated='right'>
          <Button circular size='tiny' color='facebook' icon='facebook' />
          <Button circular size='tiny' color='twitter' icon='twitter' />
          <Button circular size='tiny' color='linkedin' icon='linkedin' />
          <Button circular size='tiny' color='google plus' icon='google plus' />
        </Grid.Column>

      </Grid.Row>
    </Grid>
  );
};

export default footer;
