import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBInputGroup
} from "mdbreact";
import UserLayout from "../../layouts/UserLayout";

const HomePage = () => {
  return (
    <UserLayout>
      <div className="container-fluid">
        <h3 className="text-bold"> Goi y cho ban </h3>{" "}
        <hr style={{ border: "1px solid #ccc" }} />{" "}
        <div className="row">
          {" "}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <div className="col-sm-3 px-2">
              <MDBCard className="mb-4">
                <MDBCardImage
                  className="img-fluid"
                  src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                  waves
                />
                <MDBCardBody>
                  <strong> Story title </strong>{" "}
                  <MDBCardText>
                    short description about the stories dss{" "}
                  </MDBCardText>{" "}
                  <Link
                    to="/stories/details"
                    className="btn btn-primary float-right"
                    href="#"
                  >
                    {" "}
                    Chi tiet{" "}
                  </Link>{" "}
                </MDBCardBody>{" "}
              </MDBCard>{" "}
            </div>
          ))}{" "}
        </div>
        <h3 className="text-bold mt-5"> Danh sach thinh hanh </h3>{" "}
        <hr style={{ border: "1px solid #ccc" }} />{" "}
        <div className="row">
          {" "}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <div className="col-sm-3 px-2">
              <MDBCard className="mb-4">
                <MDBCardImage
                  className="img-fluid"
                  src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                  waves
                />
                <MDBCardBody>
                  <strong> Story title </strong>{" "}
                  <MDBCardText>
                    short description about the stories{" "}
                  </MDBCardText>{" "}
                  <Link
                    to="/stories/details"
                    className="btn btn-primary float-right"
                    href="#"
                  >
                    {" "}
                    Chi tiet{" "}
                  </Link>{" "}
                </MDBCardBody>{" "}
              </MDBCard>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </UserLayout>
  );
};

export default HomePage;
