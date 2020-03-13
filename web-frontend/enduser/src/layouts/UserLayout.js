import React from 'react';
import { Link } from 'react-router-dom';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UserSideNavigation from '../components/user/UserSideNavigation';
import UserTopNavigation from '../components/user/UserTopNavigation';

const MainLayout = (props) => {
    
    return (
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
