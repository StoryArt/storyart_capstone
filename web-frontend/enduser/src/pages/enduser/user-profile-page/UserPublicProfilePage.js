import React, { useState, useEffect } from "react";
import UserLayout from "../../../layouts/UserLayout";
import { MDBInput, MDBBtn } from "mdbreact";
import UserService from "../../../services/user.service";
const UserPublicProfilePage = props => {
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState("");
  const [us, setUs] = useState("");

  const [email, setEmail] = useState("");
  const [intro_content, setIntro_content] = useState("");
  const [is_active, setIsActive] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //   async function handleUpdateProfile(event) {
  //     event.preventDefault();
  //     let user = {
  //       id: id,
  //       name: name,
  //       intro_content: intro_content,
  //       email: email,
  //       jointAt: jointAt
  //     };
  //     try {
  //       const res = await UserService.updateProfile(user, profile.id);
  //       setProfile(res.data);

  //         setErrorMessage(
  //         <MDBAlert color="success">Lưu thành công</MDBAlert>
  //         );
  //     } catch (error) {
  //       console.log(JSON.stringify(error));

  //       var err;
  //       if (typeof error.response.data.errors != "undefined") {
  //         err = error.response.data.errors[0].defaultMessage;
  //       } else if (typeof error.response.data.message == "string") {
  //         err = error.response.data.message;
  //       }
  //       setErrorMessage(<MDBAlert color="danger">{err}</MDBAlert>);
  //     }
  //   }

  const GetProById = async (userId) => {
    try {
      const res = await UserService.getProById(userId);
      setName(res.data.name);
      setIntro_content(res.data.intro_content);
      //  var date= new Date(res.data.jointAt);

      //   setJointAt(date.toString());
      setIsActive(res.data.is_active);
      setEmail(res.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { userId } = props.match.params;
    GetProById(userId);
  }, []);

  const statusButton = [];
statusButton.push(<MDBBtn color={profile.is_active?"success": "danger"}>{profile.is_active?"Active":"Deactivated"}</MDBBtn>);


  return (
    <UserLayout>
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  {" "}
                  <strong> Account </strong>
                </h4>{" "}
              </div>{" "}
              <div className="card-body">
                {errorMessage}
                <form>
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
                      <div className="form-group">{statusButton}</div>
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
    </UserLayout>
  );
};

export default UserPublicProfilePage;
