import React, { useContext } from 'react';
// import logo from "../assets/mdb-react.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import UserService from "../../services/user.service";
import { UserContext } from '../../context/user.context';
import { isAdminAuth, isSysAdminAuth } from '../../config/auth';


const AdminSideNavigation = () => {

    const userContext = useContext(UserContext);
    const { user } = userContext;

    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                {/* <img alt="MDB React Logo" className="img-fluid" src={logo}/> */}
            </a>
            <MDBListGroup className="list-group-flush">
                {isAdminAuth(user) && (
                    <>
                        <NavLink exact={true} to="/admin/dashboard" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="chart-pie" className="mr-3"/>
                                Quan tri
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/admin/users" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="user" className="mr-3"/>
                                Quan ly nguoi dung
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/admin/reports" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="newspaper" className="mr-3"/>
                                Quan ly bao xau
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/admin/stories" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="book" className="mr-3"/>
                                Quan ly truyen
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/admin/tags" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="hashtag" className="mr-3"/>
                                Quan ly tag
                            </MDBListGroupItem>
                        </NavLink>
                    </>
                )}
                {isSysAdminAuth(user) && (
                    <NavLink to="/admin/admin" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="user-shield" className="mr-3"/>
                            Quan ly admin
                        </MDBListGroupItem>
                    </NavLink>
                )}
            </MDBListGroup>
        </div>
    );
}

export default AdminSideNavigation;