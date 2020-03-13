import React, { useState, useEffect } from "react";
import { MDBInput, MDBAlert } from "mdbreact";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";



const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

    const [user, setUser] = useState({ username: '', password: '' });
    const [loginResponseMessage, setLoginResponseMessage] = useState("");

    const changeUser = (prop, value) => setUser({ ...user, [prop]: value });

    const clearForm = () => setUser({ username: '', password: '' });

    const login = async (e) => {
        e.preventDefault();
        try {
          const res = await UserService.login(user);
    
          console.log(res.data);
          setLoginResponseMessage(res.data);
          if (res.data.accessToken !== null) {
            localStorage.setItem("tokenKey",
            res.data.tokenType +
              " " +
              res.data.accessToken);
            window.location = "/home";
          }
        } catch (error) {
          let field = error.response.data.errors[0].field;
          var userfriendlyField = "Enter ";
          switch (field) {
            case "username":
              userfriendlyField += "Tên đăng nhập ";
              break;
            case "email":
              userfriendlyField += "Email ";
              break;
            case "dob":
              userfriendlyField += "Ngày sinh ";
              break;
            case "gender":
              userfriendlyField += "Giới tính ";
              break;
            case "password":
              userfriendlyField += "Mật khẩu ";
              break;
    
              case "name":
                userfriendlyField += "Tên ";
                break;
            default:
              break;
        }
          setErrorMessage(
            <MDBAlert color="danger" >
            {userfriendlyField + error.response.data.errors[0].defaultMessage}
                    
            </MDBAlert>
          );

          
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
                                <form onSubmit={login}>
                                    <MDBInput 
                                        value={user.username}
                                        label="Ten dang nhap" 
                                        onChange={(e) => changeUser('username', e.target.value)}/>
                                    <MDBInput 
                                        value={user.password}
                                        label="Mat khau" 
                                        type="password"
                                        onChange={(e) => changeUser('password', e.target.value)} />
                                    <button className="btn btn-success float-right ml-0" type="submit">Dang nhap</button>
                                    <button 
                                        className="btn btn-secondary float-right" 
                                        type="button"
                                        onClick={clearForm}>Xoa</button>
                                    <div className="clearfix"></div>
                                    <div>Neu ban chua co tai khoan, vui long <Link style={{ color: 'green' }} to="/register">dang ki</Link>!</div>
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
