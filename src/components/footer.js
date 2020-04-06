import React from "react";
import { Grid, List, Header, Icon, Button } from "semantic-ui-react";

const footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#2D3436",
        color: "#DFE6E9",
        paddingTop: "50px"
      }}
    >
      <Grid padded="horizontally" textAlign="center">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header sub>
              <div style={{ color: "#FFFFFF", fontSize: "20px" }}>About</div>
            </Header>
            <List>
              <List.Item style={{ color: "#DFE6E9" }} as="a">
                Privacy Policy
              </List.Item>
              <List.Item style={{ color: "#DFE6E9" }} as="a">
                Terms of Service
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header style={{ color: "#DFE6E9" }} sub>
              <div style={{ color: "#FFFFFF", fontSize: "20px" }}>
                Community
              </div>
            </Header>
            <List link>
              <List.Item
                style={{ color: "#DFE6E9" }}
                style={{ color: "#DFE6E9" }}
                as="a"
              >
                Become an Affiliate
              </List.Item>
              <List.Item style={{ color: "#DFE6E9" }} as="a">
                Doctors
              </List.Item>
              <List.Item style={{ color: "#DFE6E9" }} as="a">
                Hospitals
              </List.Item>
              <List.Item style={{ color: "#DFE6E9" }} as="a">
                Laboratries
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={"equal"}>
          <Grid.Column style={{ marginTop: "10px" }}>
            <Header disabled sub floated="left" style={{ color: "#DFE6E9" }}>
              <Icon name="copyright outline" />
              <Header.Content>Health-E</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" floated="right">
            <Button circular size="tiny" color="facebook" icon="facebook" />
            <Button circular size="tiny" color="twitter" icon="twitter" />
            <Button circular size="tiny" color="linkedin" icon="linkedin" />
            <Button
              circular
              size="tiny"
              color="google plus"
              icon="google plus"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default footer;
