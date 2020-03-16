import React, { useState } from "react";
import { MDBInput, MDBAlert } from "mdbreact";

import UserService from "../../services/user.service";

import SyntaxHightlight from "../../utils/syntaxHighlight";
const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [intro_content, setIntro_content] = useState("");
  const [registerResponseMessage, setRegisterResponseMessage] = useState({
    success: false,
    message: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let user = {
      username: username,
      password: password,
      intro_content: intro_content,
      email: email,
      name: name
    };
    try {
      const res = await UserService.addUser(user);

    
      if (res.data.success == true) {
        window.setTimeout(function() {
          // Move to a new location or you can do something else
          setErrorMessage(
            <MDBAlert color="success">{res.data.message}</MDBAlert>
          );

          window.location.href = "/admin/users";
        }, 2000);
      }
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

  return (
    <div className="pt-5">
      <h3 className="text-center text-bold">+ User</h3>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-8 mx-auto">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {errorMessage}

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
                        label="Ten day du"
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
                        value={intro_content}
                        label="Nhap thong tin gioi thieu"
                        onChange={e => setIntro_content(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-success float-right ml-0"
                    type="submit"
                  >
                    Lưu
                  </button>

                  <div className="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
