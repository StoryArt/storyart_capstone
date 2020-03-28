import React, { useState, useEffect } from "react";
import { MDBInput, MDBAlert } from "mdbreact";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";
import { saveTokenToLocal, setAuthHeader, getAuthUserInfo } from '../../config/auth';
import { ROLE_NAMES } from "../../common/constants";
import MyAlert from '../../components/common/MyAlert';



const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

    const [user, setUser] = useState({ username: '', password: '' });
    const [alert, setAlert] = useState({ open: false, type: 'success', content: '' });

    const changeUser = (prop, value) => setUser({ ...user, [prop]: value });

    const clearForm = () => setUser({ username: '', password: '' });

    const login = async (e) => {
        e.preventDefault();
        try {
          const res = await UserService.login(user);
    
          console.log(res.data);
          if (res.data.accessToken != null) {
            const { tokenType, accessToken } = res.data;
            const token = tokenType + " " + accessToken;
            saveTokenToLocal(token);
            setAuthHeader(token);

            setAlert({
              open: true,
              content: 'Dăng nhập thành công',
              type: 'success'
            });
            const userInfo = getAuthUserInfo();
            
            let url = '/home';
            if(userInfo.role === ROLE_NAMES.ROLE_ADMIN){
              url = '/admin/users'
            } else if(userInfo.role === ROLE_NAMES.ROLE_SYSTEM_ADMIN){
              url = '/admin/admin';
            }
            //wait for 400 miliseconds to redirect
            window.setTimeout(() => {
                window.location.href = url;
            }, 400);
          } else if(!res.data.success){
              setAlert({
                  open: true,
                  content: 'Dăng nhập không thành công',
                  type: 'error'
              });
          }
        } catch (error) {
          if(error.response){
            setAlert({
              type: 'error',
              content: error.response.data.message,
              open: true
            });
          } else {
            console.log(error); 
          }
        }
    }

    const closeAlert = () => window.setTimeout(() => setAlert({ ...alert, open: false }), 3000);

    return (
        <div className="pt-5">
            <h3 className="text-center text-bold">Dang nhap tai khoan</h3>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                              {errorMessage}
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
                <MyAlert
                  open={alert.open}
                  setOpen={() => setAlert({ ...alert, open: true })}
                  type={alert.type}
                  content={alert.content}
                />
            </div>
        </div>
    );
};


export default LoginPage;
