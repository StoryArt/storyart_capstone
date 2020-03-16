import React, { useState, useEffect } from "react";
import UserLayout from "../../../layouts/UserLayout";
import {
  MDBInput,
  MDBAlert,
  MDBBtn,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalBody
} from "mdbreact";
import { setAuthHeader } from "../../../config/auth";

import UserService from "../../../services/user.service";

import SplitDate from "../../../utils/splitDate";

const UserProfilePage = () => {
  const [profile, setProfile] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [us, setUs] = useState("");
  const [email, setEmail] = useState("");
  const [intro_content, setIntro_content] = useState("");
  const [jointAt, setJointAt] = useState("");
  const [is_active, setIsActive] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  async function handleUpdateProfile(event) {
    event.preventDefault();
    let user = {
      id: id,
      username: us,
      name: name,
      intro_content: intro_content,
      email: email,
      jointAt: jointAt
    };
    try {
      const res = await UserService.updateProfile(user, profile.id);
      setProfile(res.data);

      setErrorMessage(<MDBAlert color="success">Lưu thành công</MDBAlert>);
    } catch (error) {
      console.log(JSON.stringify(error));

      var err;
      if (typeof error.response.data.errors != "undefined") {
        err = error.response.data.errors[0].defaultMessage;
      } else if (typeof error.response.data.message == "string") {
        err = error.response.data.message;
      }
      setErrorMessage(<MDBAlert color="danger">{err}</MDBAlert>);
    }
  }

  const getProfile = async () => {
    try {
      setAuthHeader(localStorage.getItem("jwt-token"));
      const res = await UserService.getMyProfile();
      console.log(res.data);

      setProfile(res.data);
      setEmail(res.data.email);
      setId(res.data.id);
      setName(res.data.name);
      setUs(res.data.username);
      setIntro_content(res.data.intro_content);
      var date = new Date(res.data.jointAt);

      setJointAt(date.toString());
      setIsActive(res.data.is_active);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const statusButton = [];

  if (profile.is_active == true) {
    statusButton.push(
      <MDBBtn style={{ margin: 0, fontSize: "0.8em" }}color="success">
        Active
      </MDBBtn>
    );
  } else {
    statusButton.push(
      <MDBBtn style={{ margin: 0, fontSize: "0.8em" }} color="danger">
        Deactivated
      </MDBBtn>
    );
  }

  return (
    <UserLayout>
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12">
            <div className="card">
              <div className="card-header ">
                <div className="row">
                <div className="col-sm-2">  <h2>
                  
                  <strong> Account </strong>
                </h2></div>
                <div className="col-sm-6">{statusButton}</div>
                </div>
               
              </div>{" "}
              <div className="card-body">
                {errorMessage}
                <form onSubmit={handleUpdateProfile}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="name">
                          <strong>Name</strong>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          outline
                          className="form-control"
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="username">
                          <strong>Username</strong>
                        </label>
                        <input
                          type="text"
                          id="username"
                          value={us}
                          outline
                          className="form-control"
                          onChange={e => setUs(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="text"
                          id="email"
                          value={email}
                          outline
                          className="form-control"
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        {" "}
                        <button
                          className="btn float-left"
                          style={{
                            clear: "both",
                            fontSize: "1.1em",
                            margin: 0,
                            color: "#fff",
                            backgroundColor: "#007bff"
                          }}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="intro_content">
                          <strong>Intro</strong>
                        </label>
                        <input
                          type="textarea"
                          id="intro_content"
                          value={intro_content == null ? "" : intro_content}
                          outline
                          className="form-control"
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                    </div>{" "}
                  </div>
                </form>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        <h3 className="text-bold"> Truyen cua ban </h3>{" "}
        <hr style={{ border: "1px solid #ccc" }} />{" "}
        <div className="row">
          {" "}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <div className="col-8">
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                      className="card-img"
                    />
                  </div>{" "}
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title"> Truyen ma nua dem </h5>{" "}
                      <p className="card-text">
                        {" "}
                        This is a story inro content...{" "}
                      </p>{" "}
                      <div>
                        <button className="btn btn-warning float-right">
                          {" "}
                          Edit{" "}
                        </button>{" "}
                        <button className="btn btn-success float-right mr-0">
                          {" "}
                          Publish{" "}
                        </button>{" "}
                        <button className="btn btn-danger float-right mr-0">
                          {" "}
                          Deactivate{" "}
                        </button>
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </UserLayout>
  );
};

export default UserProfilePage;
