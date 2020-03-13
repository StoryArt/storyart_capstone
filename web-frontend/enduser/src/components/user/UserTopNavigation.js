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
                        {/* <MDBNavItem style={{ marginLeft: '200px' }}>
                            <MDBFormInline waves style={{ width: '500px' }}>
                                <div className="md-form my-0" style={{ width: '100%' }}>
                                    <input className="form-control mr-sm-2" 
                                    placeholder="Search" />
                                </div>
                            </MDBFormInline>
                        </MDBNavItem> */}

                        {/* <MDBNavItem>
                            <a rel="noopener noreferrer" className="nav-link Ripple-parent" 
                            href="https://mdbootstrap.com/docs/react/" target="_blank">About MDB</a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a rel="noopener noreferrer" className="nav-link Ripple-parent" 
                            href="https://mdbootstrap.com/docs/react/getting-started/download/" target="_blank">Free download</a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a rel="noopener noreferrer"  className="nav-link Ripple-parent" 
                            href="https://mdbootstrap.com/bootstrap-tutorial/" target="_blank">Free tutorials</a>
                        </MDBNavItem> */}
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        {/* <MDBNavItem>
                            <a className="nav-link navbar-link" rel="noopener noreferrer" 
                            target="_blank" href="https://pl-pl.facebook.com/mdbootstrap/"><MDBIcon fab icon="facebook" /></a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a className="nav-link navbar-link" rel="noopener noreferrer" 
                            target="_blank" href="https://twitter.com/mdbootstrap"><MDBIcon fab icon="twitter" /></a>
                        </MDBNavItem> */}
                        {/* <MDBNavItem>
                            <a className="border border-light rounded mr-1 nav-link Ripple-parent" 
                            rel="noopener noreferrer" href="https://github.com/mdbootstrap/React-Bootstrap-with-Material-Design" target="_blank"><MDBIcon fab icon="github" className="mr-2"/>MDB GitHub</a>
                        </MDBNavItem> */}
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