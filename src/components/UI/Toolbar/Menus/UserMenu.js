import React, {Fragment} from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => (
    <Fragment>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/products/new" exact><strong>Hello, {user.displayName}!</strong> Add New Product</NavLink>
        </NavItem>
        <NavItem>
            <NavLink onClick={logout}>Log Out</NavLink>
        </NavItem>
    </Fragment>
);

export default UserMenu;
