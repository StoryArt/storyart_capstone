import React from 'react';
// import logo from "../assets/mdb-react.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const AdminSideNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                {/* <img alt="MDB React Logo" className="img-fluid" src={logo}/> */}
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/admin/dashboard" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/users" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        User management
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/reports" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="newspaper" className="mr-3"/>
                        Report management
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/stories" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="book" className="mr-3"/>
                        Story management
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/tags" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="hashtag" className="mr-3"/>
                        Tag management
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/admin" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user-shield" className="mr-3"/>
                        Admin management
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default AdminSideNavigation;