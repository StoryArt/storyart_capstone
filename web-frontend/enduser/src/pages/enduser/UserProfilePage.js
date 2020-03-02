import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import { MDBInput } from "mdbreact";

const UserProfilePage = () => {
    return (
        <UserLayout>
            <div className="container-fluid">
                <div className="row mb-5">
                    <div className="col-12">
                       <div className="card">
                           <div className="card-header">
                               <h4>Thong tin tai khoan</h4>
                           </div>
                           <div className="card-body">
                               <form>
                                   <div className="row">
                                       <div className="col-sm-6">
                                         <MDBInput label="Ten day du" outline />
                                       </div>
                                       <div className="col-sm-6">
                                         <MDBInput label="Email" outline />
                                       </div>
                                       <div className="col-sm-6">
                                            <MDBInput type="textarea" label="Gioi thieu ban than" outline />
                                       </div>
                                       <div className="col-sm-6">
                                            <MDBInput type="date" label="Ngay sinh" outline />
                                       </div>
                                   </div>
                                   <button className="btn btn-success float-right" style={{ fontSize: '1.1em' }}>Luu</button>
                               </form>
                           </div>
                       </div>
                    </div>
                </div>


                <h3 className="text-bold">Truyen cua ban</h3>
                <hr style={{ border: '1px solid #ccc' }} />
                <div className="row">
                    {[1,2,3,4,5,6,7,8,9,10].map(item => (
                        <div className="col-8">
                            <div className="card mb-3">
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" className="card-img"/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Truyen ma nua dem</h5>
                                            <p className="card-text">This is a story inro content ...</p>
                                            <div>
                                                <button className="btn btn-warning float-right">Edit</button>
                                                <button className="btn btn-success float-right mr-0">Publish</button>
                                                <button className="btn btn-danger float-right mr-0">Deactivate</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </UserLayout>
    );
};


export default UserProfilePage;
