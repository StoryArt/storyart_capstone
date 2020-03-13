import React, { useState } from 'react';
import { MDBInput  } from 'mdbreact';
import { Link } from 'react-router-dom';

const LoginPage = () => {

    const [user, setUser] = useState({ username: '', password: '' });

    const changeUser = (prop, value) => setUser({ ...user, [prop]: value });

    const clearForm = () => setUser({ username: '', password: '' });

    const login = (e) => {
        e.preventDefault();
        console.log(user);
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
