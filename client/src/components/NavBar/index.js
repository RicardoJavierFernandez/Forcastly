import React, { Component } from 'react';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
            <Link to="/home" className="custom-link navbar-brand">4castly</Link>
                <Nav className="mr-auto">
                <Link to="/home" className="custom-link nav-link">Home</Link>
                <Link to="/forecast" className="custom-link nav-link">Forecast</Link>
                <NavDropdown title="Orders" id="nav-dropdown">
                    <Link to="/createorder" className="custom-link link-item dropdown-item">Create Order</Link>
                    <Link to="/history" className="custom-link link-item dropdown-item">View Orders</Link>
                </NavDropdown>
                <NavDropdown title="Products" id="nav-dropdown">
                    <Link to="/createproduct" className="custom-link link-item dropdown-item">Add Product</Link>
                    <Link to="/creategroup" className="custom-link link-item dropdown-item">Add Product Group</Link>
                    <Link to="/inventory" className="custom-link link-item dropdown-item">View Inventory</Link>
                </NavDropdown>
                <Link to="/upload" className="custom-link nav-link">Upload</Link>
                </Nav>
            </Navbar>
        )
    }
}

export default NavBar;

