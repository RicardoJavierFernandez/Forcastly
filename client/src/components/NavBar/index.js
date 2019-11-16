import React, { Component } from 'react';

import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

import './styles.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="home">Forcastly</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="home">Home</Nav.Link>
                <Nav.Link href="forecast">Forecast</Nav.Link>
                <NavDropdown title="Orders" id="nav-dropdown">
                    <NavDropdown.Item href="createorder">Create Order</NavDropdown.Item>
                    <NavDropdown.Item href="history">View Orders</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Products" id="nav-dropdown">
                    <NavDropdown.Item href="createproduct">Add Product</NavDropdown.Item>
                    <NavDropdown.Item href="creategroup">Add Product Group</NavDropdown.Item>
                    <NavDropdown.Item href="inventory">View Inventory</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}

export default NavBar;

