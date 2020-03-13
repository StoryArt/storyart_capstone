import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, 
    MDBCollapse, MDBNavItem, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdbreact';
import { Link } from 'react-router-dom';

import UserService from "../../services/user.service";

class AdminTopNavigation extends Component {
    state = {
        collapse: false,
        
     };
    

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <MDBNavbar className="fixed-top" light expand="md">
                <MDBNavbarBrand href="/">
                    <strong>StoryArt</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav left>
                       
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                       
                         <MDBNavItem>
                            <MDBDropdown align="right">
                                <MDBDropdownToggle nav caret>
                                    <span className="mr-2">Dropdown</span>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                <MDBDropdownItem href="#!">Account info</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Change password</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link to="/admin/register" 
                                className="border border-light rounded mr-1 nav-link Ripple-parent">Register</Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link to="/admin/login" 
                                className="border border-light rounded mr-1 nav-link Ripple-parent">Login</Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link to="/" 
                                className="border border-light rounded mr-1 nav-link Ripple-parent">Logout</Link>
                        </MDBNavItem>
                       
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default AdminTopNavigation;