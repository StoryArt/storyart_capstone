import React from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UserSideNavigation from '../components/user/UserSideNavigation';
import UserTopNavigation from '../components/user/UserTopNavigation';

const MainLayout = (props) => {
    return (
        // <div>
        //     <Navbar bg="primary" expand="lg">
        //         <Navbar.Brand href="#home">StoryArt</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="mr-auto">
        //                 <Link className="nav-link" to="/">Home</Link>
        //                 <Link className="nav-link" to="/create-story">Create Stories</Link>
        //             </Nav>
        //             <NavDropdown className="ml-auto" title="Account" id="basic-nav-dropdown">
        //                 <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
        //                 <NavDropdown.Item href="#action/3.2">Register</NavDropdown.Item>
        //             </NavDropdown>
        //         </Navbar.Collapse>
        //     </Navbar>
        //     <div>
        //         { props.children }
        //     </div>
        // </div>
        <div className="flexible-content">
            <UserTopNavigation />
            <UserSideNavigation />
            <main id="content" className="p-5" >
                { props.children }
            </main>
            {/* <Footer /> */}
        </div>
    );
};


export default MainLayout;
