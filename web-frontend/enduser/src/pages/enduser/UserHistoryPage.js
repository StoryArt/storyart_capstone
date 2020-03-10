import React, { useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import { MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane, MDBNav } from 'mdbreact';

const UserHistoryPage = () => {

    const [activeItem, setActiveItem] = useState('1');
    
  
    const toggle = tab => e => {
        if (activeItem !== tab) {
          setActiveItem(tab);
        }
    };
<<<<<<< HEAD
// eslint-disable-next-line
=======

>>>>>>> story-service
    return (
        <UserLayout>
            <div className="container-fluid">
                <MDBNav className="nav-tabs" className="mb-4">
                    <MDBNavItem>
                        <MDBNavLink to="#" active={activeItem === "1"} onClick={toggle("1")} role="tab" >
                            Doc Truyen
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={activeItem === "2"} onClick={toggle("2")} role="tab" >
                            Binh luan
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={activeItem === "3"} onClick={toggle("3")} role="tab" >
                            Reaction
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={activeItem} >
                <MDBTabPane tabId="1" role="tabpanel">
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
                                                <button className="btn btn-warning float-right">Doc truyen</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </MDBTabPane>
                <MDBTabPane tabId="2" role="tabpanel">
                  {[1,2,3,4].map(item => (
                       <div className="clearfix">
                            Ban da <strong>binh luan</strong> vao truyen <strong>Nghin le mot dem</strong> cua tac gia <strong>Nguyen Van A</strong>
                            <p> Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                            </p>
                            <div>
                                <small>10:20 20/10/2019</small>
                            </div>
                            <button className="btn btn-danger float-right">Delete</button>
                            <button className="btn btn-warning float-right">Edit</button>
                        </div>
                  ))}

                    
                </MDBTabPane>
                <MDBTabPane tabId="3" role="tabpanel">
                    {[1,2,3,4,5,6].map(item => (
                        <div className="clearfix">
                                Ban da <strong>like</strong> binh luan cua <strong>Nguyen Van A</strong> 
                                trong truyen <strong>Nghin le mot dem</strong>
                                <div>
                                    <small>10:20 20/10/2019</small>
                                </div>
                                <button className="btn btn-danger float-right">Delete</button>
                               
                            </div>
                    ))}
                    {[1,2,3,4].map(item => (
                       <div className="clearfix">
                            Ban da <strong>danh gia</strong> vao truyen <strong>Nghin le mot dem</strong> cua tac gia <strong>Nguyen Van A</strong> voi <strong>4 sao</strong>
                            <div>
                                <small>10:20 20/10/2019</small>
                            </div>
                        </div>
                    ))}
                </MDBTabPane>
                </MDBTabContent>
                    
            </div>
        </UserLayout>
    );
};


export default UserHistoryPage;
