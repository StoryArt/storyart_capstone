import React, { useState, useEffect } from "react";
import { MDBInput } from "mdbreact";
import { Link } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";

import UserService from "../../services/user.service";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponseMessage, setLoginResponseMessage] = useState("");




  async function handleSubmit(event) {
    event.preventDefault();
    let user = { username: username, password: password };
    try {
      const res = await UserService.login(user);

      console.log(res.data);
      setLoginResponseMessage(res.data);
      if (res.data.accessToken !== null) {
        localStorage.setItem("tokenKey",
        res.data.tokenType +
          " " +
          res.data.accessToken);
        window.location = "http://localhost:3001/home";
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="pt-5">
      <h3 className="text-center text-bold">Dang nhap tai khoan</h3>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    value={username}
                    label="Ten dang nhap"
                    onChange={e => setUsername(e.target.value)}
                  />
                  <MDBInput
                    label="Mat khau"
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-success float-right ml-0"
                    type="submit"
                  >
                    Dang nhap
                  </button>
                  <div className="clearfix"></div>
                  <div>{loginResponseMessage.message}</div>
                  <div>
                    Neu ban chua co tai khoan, vui long{" "}
                    <Link style={{ color: "green" }} to="/register">
                      dang ki
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
export default LoginPage;
