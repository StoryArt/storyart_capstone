import React, { useState } from 'react';
import { MDBInput  } from 'mdbreact';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const [user, setUser] = useState({ username: '', password: '' });

    const changeUser = (prop, value) => setUser({ ...user, [prop]: value });

    const clearForm = () => setUser({ username: '', password: '' });

    const register = (e) => {
        e.preventDefault();
        console.log(user);
    }

    return (
        <div className="pt-5">
            <h3 className="text-center text-bold">Dang ky tai khoan</h3>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-8 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={register}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <MDBInput 
                                                value={user.username}
                                                label="Ten dang nhap" 
                                                onChange={(e) => changeUser('username', e.target.value)}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <MDBInput 
                                                value={user.password}
                                                type="password"
                                                label="Mat khau" 
                                                onChange={(e) => changeUser('password', e.target.value)} />
                                        </div>
                                        <div className="col-sm-6">
                                            <MDBInput 
                                                value={user.birthdate}
                                                label="Ngay sinh" 
                                                type="date"
                                                onChange={(e) => changeUser('birthdate', e.target.value)}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <label>Gioi tinh</label><br/>
                                            <input 
                                                type="radio"
                                                
                                                checked={user.gender === 'male'}
                                                onClick={(e) => changeUser('gender', 'male')}/> Nam
                                            <input 
                                                type="radio"
                                                className="ml-3"
                                                checked={user.gender === 'female'}
                                                onClick={(e) => changeUser('gender', 'female')}/> Nu
                                        </div>
                                        <div className="col-12">
                                            <MDBInput 
                                                type="textarea"
                                                rows="3"
                                                value={user.introContent}
                                                label="Nhap thong tin gioi thieu" 
                                                onChange={(e) => changeUser('introContent', e.target.value)}/>
                                        </div>
                                    </div>
                                    
                                    
                                    <button className="btn btn-success float-right ml-0" type="submit">Dang ky</button>
                                    <button 
                                        className="btn btn-secondary float-right" 
                                        type="button"
                                        onClick={clearForm}>Xoa</button>
                                    <div className="clearfix"></div>
                                    <div>Neu ban da co tai khoan, vui long <Link style={{ color: 'green' }} to="/login">dang nhap</Link>!</div>
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
