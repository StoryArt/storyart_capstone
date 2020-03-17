import React, { useState, useContext } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, 
    MDBCollapse, MDBNavItem, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdbreact';
import { Link } from 'react-router-dom';

import UserService from "../../services/user.service";
import { UserContext } from '../../context/user.context';

const AdminTopNavigation = () => {
   

     const [collapse, setCollapse] = useState(false);
     const userContext = useContext(UserContext);
     const { user } = userContext;
    

    const onClick = () => setCollapse(!collapse)

    // toggle = () => {
    //     this.setState({
    //         dropdownOpen: !this.state.dropdownOpen
    //     });
    // }

    const logout = (e) => {
        e.preventDefault();
        UserService.logout();
    }

    return (
        <MDBNavbar className="fixed-top" light expand="md">
            <MDBNavbarBrand href="/">
                <strong>StoryArt</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick = { onClick } />
            <MDBCollapse isOpen = { collapse } navbar>
                <MDBNavbarNav left>
                    
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    
                        {/* <MDBNavItem>
                        <MDBDropdown align="right">
                            <MDBDropdownToggle nav caret>
                                <span className="mr-2">Dropdown</span>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu>
                            <MDBDropdownItem href="#!">Account info</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Change password</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem> */}
                    <MDBNavItem>
                        <Link to="/admin"
                            className="border border-light rounded mr-1 nav-link Ripple-parent">{user.name}</Link>
                    </MDBNavItem>
                    <MDBNavItem>
                        <Link onClick={logout}
                            className="border border-light rounded mr-1 nav-link Ripple-parent">Dang xuat</Link>
                    </MDBNavItem>
                    
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
}

export default AdminTopNavigation;