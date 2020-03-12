import React from 'react';
import { Link } from 'react-router-dom';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UserSideNavigation from '../components/user/UserSideNavigation';
import UserTopNavigation from '../components/user/UserTopNavigation';

const MainLayout = (props) => {
    const { backgound } = props
    return (
        <div className="flexible-content">
            <UserTopNavigation />
            <UserSideNavigation />
            <main id="content" className="p-5" style={{ background: backgound === null ? '' : backgound }}>
                { props.children }
            </main>
            {/* <Footer /> */}
        </div>
    );
};


export default MainLayout;
