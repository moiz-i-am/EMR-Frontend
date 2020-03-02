import React, { Component } from "react";
import { Dropdown, Icon, Input, Menu, Header, Image } from "semantic-ui-react";
import userImg from "./../../assets/user-solid.svg";

const trigger = props => (
  <span style={{ fontSize: 11 }}>
    <Header as="h7" color="teal" textAlign="center">
      <Image src={userImg} /> {props.username}
    </Header>
  </span>
);

export default class MenuExampleSubMenu extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu vertical>
        <Menu.Item>
          <h1>HEALTH-E</h1>
        </Menu.Item>
        <Menu.Item>
          <Dropdown floating item trigger={trigger(this.props)}>
            <Dropdown.Menu>
              <Dropdown.Item icon="user" text="View Profile" />
              <Dropdown.Item icon="edit" text="Edit Profile" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          name="browse"
          active={activeItem === "browse"}
          onClick={this.handleItemClick}
        >
          <Icon name="grid layout" />
          Browse
        </Menu.Item>
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={this.handleItemClick}
        >
          Messages
        </Menu.Item>

        <Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}
