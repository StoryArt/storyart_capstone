import React from 'react';
import TopNavigation from '../components/admin/AdminTopNavigation';
import SideNavigation from '../components/admin/AdminSideNavigation';
import Footer from '../components/admin/Footer';

const AdminLayout = (props) => {
    return (
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          <main id="content" className="p-5">
            { props.children }
          </main>
          <Footer />
        </div>
    );
};


export default AdminLayout;
