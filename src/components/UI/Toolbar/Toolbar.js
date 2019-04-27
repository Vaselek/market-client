import React from 'react';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';
import UserMenu from "./Menus/UserMenu";
import AnonymousMenu from "./Menus/AnonymousMenu";

const Toolbar = ({user, logout}) => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={RouterNavLink} to="/">Market</NavbarBrand>

      <Nav className="ml-auto" navbar>
        {user ? <UserMenu user={user} logout={logout}/> : <AnonymousMenu/>}
      </Nav>
    </Navbar>
  );
};

export default Toolbar;
