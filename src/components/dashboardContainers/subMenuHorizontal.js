import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";

export default class MenuExampleSizeHuge extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="huge">
        <Menu.Item name="home" active={activeItem === "home"} />

        <Menu.Menu position="right">
          <Dropdown item icon="bars">
            <Dropdown.Menu>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
