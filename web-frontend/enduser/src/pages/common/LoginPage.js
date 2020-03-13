import React, { useState, useEffect } from "react";
import { MDBInput } from "mdbreact";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalBody,MDBAlert
} from "mdbreact";

import UserService from "../../services/user.service";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponseMessage, setLoginResponseMessage] = useState("");
  const [modal, setModal] = useState({
    header: "",
    status: false,
    message: []
  });
  //open modal/ close modal
  const toggle = () => {
    setModal({ status: !modal.status });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let user = { username: username, password: password };
    try {
      const res = await UserService.login(user);
     if(res.data.success==false){
      setLoginResponseMessage((<MDBAlert color="danger">{res.data.message}</MDBAlert>));

     }
      if (typeof res.data.accessToken == 'string') {
        localStorage.setItem(
          "tokenKey",
          res.data.tokenType + " " + res.data.accessToken
        );
        window.location = "http://localhost:3001/home";
        let headerar = <MDBBtn gradient="aqua">Đã lưu</MDBBtn>;
        setModal({ header: headerar, status: true, message: res.data });
      }
    } catch (error) {
      let headerar = <MDBBtn color="danger">Đã xảy ra lỗi</MDBBtn>;

      setModal({
        header: headerar,
        status: true,
        message: error.response.data
      });
    }
  }

  return (
    <div className="pt-5">
      <h3 className="text-center text-bold">Đăng nhập</h3>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-6 mx-auto">
            <div className="card">
              <div className="card-body">
              <div>{loginResponseMessage}</div>

                <form onSubmit={handleSubmit}>
                  <MDBInput
                    value={username}
                    label="Tên đăng nhập"
                    onChange={e => setUsername(e.target.value)}
                  />
                  <MDBInput
                    label="Mật khẩu"
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-success float-right ml-0"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                  <div className="clearfix"></div>
                  <div>
                    Nếu chưa có tài khoản, vui lòng{" "}
                    <Link style={{ color: "green" }} to="/register">
                      đăng ký
                    </Link>
                    !
                  </div>
                </form>
                <MDBModal isOpen={modal.status} toggle={toggle}>
                  <MDBModalHeader toggle={toggle}>
                    {modal.header}
                  </MDBModalHeader>
                  <MDBModalBody>{JSON.stringify(modal.message)}</MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>
                      Close
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
