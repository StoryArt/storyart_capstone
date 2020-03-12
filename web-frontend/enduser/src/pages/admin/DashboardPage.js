import React from 'react';
import { MDBRow } from 'mdbreact';
import AdminCardSection1 from './sections/AdminCardSection1';
import AdminCardSection2 from './sections/AdminCardSection2';
import TableSection from './sections/TableSection';
import BreadcrumSection from './sections/BreadcrumSection';
import ChartSection1 from './sections/ChartSection1';
import ChartSection2 from './sections/ChartSection2';
import MapSection from './sections/MapSection';
import ModalSection from './sections/ModalSection';

import AdminLayout from '../../layouts/AdminLayout';

const DashboardPage =  () => {
  return (
    <AdminLayout>
      {/* <BreadcrumSection /> */}
      {/* <AdminCardSection1 />
      <ChartSection1 />
      <TableSection />
      <ChartSection2 />
      <MDBRow className="mb-4">
          <MapSection />
          <ModalSection />
      </MDBRow>
      <AdminCardSection2 /> */}
    </AdminLayout>
  )
}

export default DashboardPage;