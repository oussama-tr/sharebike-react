import React, { useState } from 'react'
import { Button, Container, Grid, Menu, Dropdown, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';

function Header() {
  const [dropdownMenuStyle, setDropdownMenuStyle] = useState(
    {
      display: "none"
    }
  )
  const handleToggleDropdownMenu = () => {
    if (dropdownMenuStyle.display === "none") {
      setDropdownMenuStyle({ display: "flex" });
    } else {
      setDropdownMenuStyle({ display: "none" });
    }
  };
  return (
    <>
      <Grid padded className="tablet computer only">
        <Container>
          <Menu borderless inverted size="huge">
            <Menu.Item header>
              <Link to='/'>
              Share Bike
              </Link>
              </Menu.Item>
            <Menu.Item active >
            <Link to='/'>
              Home
              </Link>
              </Menu.Item>
            <Menu.Item >About</Menu.Item>
            <Menu.Item >Contact</Menu.Item>
            <Dropdown text="Dropdown" className="item">
              <Dropdown.Menu>
                <Dropdown.Item >Action</Dropdown.Item>
                <Dropdown.Item >Another action</Dropdown.Item>
                <Dropdown.Item >Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Navbar header</Dropdown.Header>
                <Dropdown.Item >Seperated link</Dropdown.Item>
                <Dropdown.Item >One more seperated link</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Container>
      </Grid>
      <Grid className="mobile only">
        <Menu inverted borderless size="huge" fixed="top">
          <Menu.Item header >
            Project Name
            </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                icon
                basic
                inverted
                toggle
                onClick={handleToggleDropdownMenu}
              >
                <Icon name="content" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
          <Menu
            vertical
            borderless
            inverted
            fluid
            style={dropdownMenuStyle}
          >
            <Menu.Item active >
              Home
              </Menu.Item>
            <Menu.Item >About</Menu.Item>
            <Menu.Item >Contact</Menu.Item>
            <Dropdown text="Dropdown" className="item">
              <Dropdown.Menu>
                <Dropdown.Item >Action</Dropdown.Item>
                <Dropdown.Item >Another action</Dropdown.Item>
                <Dropdown.Item >Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Navbar header</Dropdown.Header>
                <Dropdown.Item >Seperated link</Dropdown.Item>
                <Dropdown.Item >One more seperated link</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Menu>
      </Grid>
    </>
  )
}

export default Header
