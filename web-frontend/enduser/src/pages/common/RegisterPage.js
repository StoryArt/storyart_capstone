import React, { useState } from "react";
import { MDBInput, MDBAlert } from "mdbreact";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";

import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-avataaars-sprites';
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [introContent, setIntroContent] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");


  async function handleSubmit(event) {
    
    event.preventDefault();
    let randomImage="https://avatars.dicebear.com/v2/avataaars/"+username+".svg"+"?options[mood][]=happy&options[mouth][]=smile&options[accessories][]=sunglasses"
   
    let user = {
      name: name,
      username: username,
      password: password,
      introContent: introContent,
      email: email,
      avatar: randomImage
    };
   
    try {


      
      const res = await UserService.register(user);
      if (res.data.success == true) {
        setErrorMessage(
          <MDBAlert color="success">{res.data.message}</MDBAlert>
        );
        window.setTimeout(() => {
          window.location.href = "/login";
        }, 400);
      }
    } catch (error) {
      var err;
      if (typeof error.response.data.errors != "undefined") {
        err = error.response.data.errors[0].defaultMessage;
      } else if (typeof error.response.data.message == "string") {
        err = error.response.data.message;
      }
      setErrorMessage(<MDBAlert color="danger">{err}</MDBAlert>);

    }
  }

  return (
    <div className="pt-5">
      <h3 className="text-center text-bold">Dang ky tai khoan</h3>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-8 mx-auto">
            <div className="card">
              <div className="card-body">
                {errorMessage}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <MDBInput
                        value={username}
                        label="Ten dang nhap"
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <MDBInput
                        value={name}
                        label="ten day du"
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <MDBInput
                        value={email}
                        type="email"
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <MDBInput
                        value={password}
                        type="password"
                        label="Mat khau"
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <MDBInput
                        type="textarea"
                        rows="3"
                        value={introContent}
                        label="Nhap thong tin gioi thieu"
                        onChange={e => setIntroContent(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-success float-right ml-0"
                    type="submit"
                  >
                    Dang ky
                  </button>

                  <div className="clearfix"></div>
                  <div>
                    Neu ban da co tai khoan, vui long{" "}
                    <Link style={{ color: "green" }} to="/login">
                      dang nhap
                    </Link>
                    !
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
