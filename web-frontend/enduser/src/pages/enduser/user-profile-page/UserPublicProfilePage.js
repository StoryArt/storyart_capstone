import React, { useState, useEffect } from "react";
import MainLayout from "../../../layouts/main-layout/MainLayout";
import { MDBInput, MDBBtn, MDBRow, MDBCol, MDBContainer } from "mdbreact";
import UserService from "../../../services/user.service";
import DateTimeUtils from "../../../utils/datetime";

const UserPublicProfilePage = props => {
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState("");
  const [jointAt, setJointAt] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [intro_content, setIntro_content] = useState("");
  const [is_active, setIsActive] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const GetProById = async userId => {
    try {
      const res = await UserService.getProById(userId);
      setProfile(res.data);
      setName(res.data.name);
      setIntro_content(res.data.intro_content);
      setIsActive(res.data.active);
      setEmail(res.data.email);
      setAvatar(res.data.avatar);
      setJointAt(res.data.jointAt);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { userId } = props.match.params;
    GetProById(userId);
  }, []);

  const statusButton = [];
  statusButton.push(
    <MDBBtn
      style={{ padding: 0 }}
      color={profile.active ? "success" : "danger"}
    >
      {profile.active ? "Active" : "Deactivated"}
    </MDBBtn>
  );

  return (
    <MainLayout>
      
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div style={{ paddingRight: 0 }} className="col-sm-2">
                    <h2 style={{ marginRight: 0 }}>
                      <strong>Account</strong>
                    </h2>
                  </div>
                  <div style={{ padding: 0 }} className="col-sm-3">
                    {statusButton}
                  </div>
                </div>
              </div>{" "}
              <div className="card-body">
                {errorMessage}

                <div className="row">
                    {/* //avatar */}
                    <div className="form-group col-sm-6 field avatar">
                      <div className="avatar-container">
                        <label htmlFor="avatar1">
                          <strong>Avatar</strong>
                        </label>
                        <div className="avatar-80">
                          <img
                            id="avatar1"
                            name="avatar1"
                            src={avatar}
                            width="80"
                          />
                        </div>
                      </div>
                      </div>
                  </div>
               
                <form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="name">
                          <strong>Name</strong>
                        </label>
                        <input
                          disabled
                          type="text"
                          id="name"
                          value={name}
                          outline
                          className="form-control"
                          onChange={e => setName(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">
                          <strong>Email</strong>
                        </label>
                        <input
                          disabled
                          type="text"
                          id="email"
                          value={email}
                          outline
                          className="form-control"
                          onChange={e => setEmail(e.target.value)}
                        />
                        {" "}
                        
                      </div>
                      Joint at:
                      {DateTimeUtils.getDateTime(jointAt)}
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="intro_content">
                          <strong>Intro</strong>
                        </label>
                        <textarea
                          disabled
                          type="textarea"
                          id="intro_content"
                          value={intro_content == null ? "" : intro_content}
                          outline
                          className="form-control text-area"
                          onChange={e => setIntro_content(e.target.value)}
                        />
                      </div>
                    </div>{" "}
                  </div>
                </form>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        <h3 className="text-bold"> Truyện của tác giả </h3>{" "}
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
    </MainLayout>
  );
};

export default UserPublicProfilePage;
