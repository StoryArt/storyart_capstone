import React, { useState, useEffect } from "react";
import UserLayout from "../../layouts/UserLayout";
import { MDBInput, MDBBtn } from "mdbreact";
import UserService from "../../services/user.service";

import SplitDate from "../../utils/splitDate";

const UserProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intro_content, setIntro_content] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [joinAt, setJoinAt] = useState("");


  const handleSetGender =(event, value)=>{
    setGender(value);
  }

  async function handleUpdateProfile(event) {
    event.preventDefault();
    let user = {
      id: id,
      name: name,
      intro_content: intro_content,
      email: email,
      dob: "2020-03-01 17:49:20",
      gender: gender,
      joinAt: joinAt
    };



    

    const res = await UserService.updateProfile(user, posts.id);
    setPosts(res.data);

    if (res.data.username != null) {
      alert("Saved");
    }
  }

 

  const getPosts = async () => {
    try {
      const res = await UserService.getMyProfile();

      const dobT = res.data.dob;
      res.data.dob = SplitDate.splitDate(dobT);


      setPosts(res.data);
      setEmail(res.data.name);
      setId(res.data.id);
      setName(res.data.email);
      setGender(res.data.gender);
      setIntro_content(res.data.intro_content);
      setDob(res.data.dob);
      setJoinAt(res.data.joinAt)
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  const statusButton = [];

  if (posts.is_active == true) {
    statusButton.push(
      <MDBBtn color="success">
        Active
      </MDBBtn>
    );
  } else {
    statusButton.push(<MDBBtn color="deep-orange">Deactivated</MDBBtn>);
  }

  return (
    <UserLayout>
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4> Thong tin tai khoan </h4>{" "}
              </div>{" "}
              <div className="card-body">
                <form onSubmit={handleUpdateProfile}>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDBInput
                        label="Ten day du"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>{" "}
                    <div className="col-sm-6">
                      <MDBInput
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        outline
                      />
                    </div>{" "}
                    <div className="col-sm-6">
                      <MDBInput
                        value={dob}
                        label="Ngay sinh"
                        type="date"
                        onChange={e => setDob(e.target.value)}
                      />
                    </div>{" "}
                    <div className="col-sm-6">
                      <MDBInput
                        type="textarea"
                        label="Gioi thieu ban than"
                        value={
                          intro_content == null ? "" : intro_content
                        }
                        onChange={e => setIntro_content(e.target.value)}
                        outline
                      />
                    </div>{" "}
                    <div className="col-sm-6">
                      <MDBBtn color="info"
                        type="textarea"
                        label="Joint at"
                        value={joinAt}
                        outline
                      >{joinAt}</MDBBtn>
                    </div>{" "}
                    <div className="col-sm-6">{statusButton}</div>{" "}
                    <div className="col-sm-6">
                      <label>Gioi tinh</label> {":" +gender}
                      <br />
                      <input
                        type="radio"
                        name="materialExampleRadios"
                        // checked={gender !== ""?gender==="female": posts.gender==="female" }
                        onChange={e => handleSetGender(e,"male")}
                      />{" "}
                      Nam
                      <input
                        type="radio"
                        name="materialExampleRadios"
                        // checked={gender !== ""?gender==="male": posts.gender==="male"}
                        onChange={e => handleSetGender(e,"female")}
                      />{" "}
                      Nu
                    </div>
                    <button
                      className="btn btn-success float-right"
                      style={{ fontSize: "1.1em" }}
                    >
                      {" "}
                      Luu{" "}
                    </button>{" "}
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
