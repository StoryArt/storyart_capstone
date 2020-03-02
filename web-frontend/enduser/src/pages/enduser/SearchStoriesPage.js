import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn, MDBInputGroup } from 'mdbreact';
import UserLayout from '../../layouts/UserLayout';


const SearchStoriesPage = () => {
    return (
        <UserLayout>
            
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-sm-6 mx-auto">
                    <MDBInputGroup
                        hint="Tim truyen..."
                        containerClassName="mb-3"
                        append={
                            <MDBBtn outline className="m-0 px-3 py-2 z-depth-0">
                                Bo loc
                            </MDBBtn>
                        }
                        />
                    </div>
                </div>
                <h3 className="text-bold">Tat ca truyen</h3>
                <hr style={{ border: '1px solid #ccc' }}/>
                <div className="row">
                    {[1,2,3,4,5,6,7,8,9,10].map(item => (
                        <div className="col-sm-3 px-2">
                            <MDBCard className="mb-4">
                                <MDBCardImage 
                                    className="img-fluid" 
                                    src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                                <MDBCardBody>
                                    <strong>Story title</strong>
                                    <MDBCardText>
                                        short description about the stories
                                    </MDBCardText>
                                    <Link to="/stories/details" className="btn btn-primary float-right" href="#">Chi tiet</Link>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    ))}
                </div>
           </div>
        </UserLayout>
    );
};


export default SearchStoriesPage;
