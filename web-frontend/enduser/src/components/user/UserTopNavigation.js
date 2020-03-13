
import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, 
    MDBCollapse, MDBNavItem, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBNavLink, MDBFormInline } from 'mdbreact';
import { Link } from 'react-router-dom';

class UserTopNavigation extends Component {
    state = {
        collapse: false
    }

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
                                    <span className="mr-2">Settings</span>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                <MDBDropdownItem href="#!">Tai khoan</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Doi mat khau</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link to="/admin/register" 
                                className="border border-light rounded mr-1 nav-link Ripple-parent">Dang ki</Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link to="/admin/login" 
                                className="border border-light rounded mr-1 nav-link Ripple-parent">Dang nhap</Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link to="/admin/login" 
                                className="border border-light rounded mr-1 nav-link Ripple-parent">Dang xuat</Link>
                        </MDBNavItem>
                       
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default UserTopNavigation;

