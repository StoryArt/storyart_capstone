
import React, {  useState, useEffect, useContext } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, 
    MDBCollapse, MDBNavItem, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBNavLink, MDBFormInline } from 'mdbreact';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { isUserAuth } from '../../config/auth';
import UserService from '../../services/user.service';

const UserTopNavigation = () => {
 
    const [collapse, setCollapse] = useState(false);
    const userContext = useContext(UserContext);
    const { user } = userContext;

    const onClick = () => {
        setCollapse(!collapse);
    }

    // const toggle = () => {
    //     this.setState({
    //         dropdownOpen: !this.state.dropdownOpen
    //     });
    // }

    const logout = (e) => {
        console.log('logout');
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
                    
                        <MDBNavItem>
                        <MDBDropdown align="right">
                            <MDBDropdownToggle nav caret>
                                <span className="mr-2">Cau hinh</span>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu>
                            <MDBDropdownItem href="#!">Tai khoan</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Doi mat khau</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                    {(!isUserAuth(user)) && (
                        <>
                            <MDBNavItem>
                            <Link to="/register" 
                                className="border border-light rounded mr-1 nav-link Ripple-parent">Dang ki</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link to="/login" 
                                    className="border border-light rounded mr-1 nav-link Ripple-parent">Dang nhap</Link>
                            </MDBNavItem>
                        </>
                    )}
                    
                   
                    {(isUserAuth(user)) && (
                        <>
                            <MDBNavItem>
                                <Link to="/user/edit-profile" 
                                    className="border border-light rounded mr-1 nav-link Ripple-parent">{user.name}</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link onClick={logout} to="/"
                                    className="border border-light rounded mr-1 nav-link Ripple-parent">Dang xuat</Link>
                            </MDBNavItem>
                         </>
                    )}
                    
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
}

export default UserTopNavigation;

