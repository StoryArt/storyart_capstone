import React from 'react';
// import logo from "../assets/mdb-react.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const UserSideNavigation = () => {

//     const [user, setUser]=[{}];
//     getMyProfile = async () => {
//         try {
//           const res = await UserService.getMyProfile();
//           setUser(res.data);
//         } catch (error) {}
//       };

//    const sideDashBoardForSys_Ad=[];

//    if(user.role=="ROLE_ADMIN"){
//     sideDashBoardForSys_Ad.push(<NavLink to="/admin/user/userOnly" activeClassName="activeClass">
//     <MDBListGroupItem>
//         <MDBIcon icon="book" className="mr-3"/>
//         Quan ly User
//     </MDBListGroupItem>
// </NavLink>);
// }else if(user.role=="ROLE_SYSTEM_ADMIN"){
//     sideDashBoardForSys_Ad.push(
//         <NavLink to="/systemad" activeClassName="activeClass">
//                     <MDBListGroupItem>
//                         <MDBIcon icon="book" className="mr-3"/>
//                         Quan ly Admin
//                     </MDBListGroupItem>
//                 </NavLink>
//     );
// }



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
                <NavLink to="/search-stories" activeClassName="activeClass">
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
            </MDBListGroup>
        </div>
    );
}

export default UserSideNavigation;