import React from 'react';
// import logo from "../assets/mdb-react.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const UserSideNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                {/* <img alt="MDB React Logo" className="img-fluid" src={logo}/> */}
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Trang chu
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/stories/search" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        Tim kiem truyen
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/user/history" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="book" className="mr-3"/>
                        Lich su
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/user/profile" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="book" className="mr-3"/>
                        Quan ly tai khoan
                    </MDBListGroupItem>
                </NavLink>

                <NavLink to="/stories/create" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="book" className="mr-3"/>
                        Tao truyen
                    </MDBListGroupItem>
                </NavLink>


            </MDBListGroup>
        </div>
    );
}

export default UserSideNavigation;