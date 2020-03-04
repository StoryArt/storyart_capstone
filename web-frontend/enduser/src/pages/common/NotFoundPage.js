import React from 'react'
import { MDBCol, MDBRow } from 'mdbreact';
// import logo from "../../assets/mdb-react.png";


const NotFoundPage =  () => {
  return (
    <div>
      <div className="full">
        <MDBRow className="bad-gateway-row">
          <MDBCol md="8">
            {/* <img alt="Error 404" className="img-fluid" hieght="20px" src={logo}/> */}
            <h2 className="h2-responsive mt-3 mb-2">404. NOT FOUND.</h2>
            <h4>This URL does not link to any page</h4>
          </MDBCol>
          <MDBCol md="4">
            <img alt="Error 404" className="img-fluid" src="https://mdbootstrap.com/img/Others/grafika404-bf.png"/>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  )
}

export default NotFoundPage;