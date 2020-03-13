import React from 'react';
import { MDBRating  } from 'mdbreact';
import UserLayout from '../../layouts/UserLayout';
const StoryDetailsPage = () => {
    return (
        <UserLayout>
           <div className="container-fluid">
               <div className="row">
                   <div className="col-sm-3">
                       <img 
                        className="img-fluid"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQbfT488JW6Aure5ahx7I2CKmeAk6p2FyTRLQLRJW4s55CNhUjo" />
                        <div className="text-center">
                            <button className="btn btn-success">Doc truyen</button>
                            <button className="btn btn-warning">Sua truyen</button>
                        </div>
                   </div>
                   <div className="col-sm-9">
                       <h3 className="font-weight-bold">Nghin le mot dem / <small>Nguyen Van A</small></h3>
                       <strong style={{ fontSize: '1.2em' }}>4.5 stars</strong>
                       <p>It is a long established fact that a reader will be distracted by the readable content 
                           of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
                           more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
                           making it look like readable English. Many desktop publishing packages and web page 
                           editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'
                            will uncover many web sites still in their infancy. Various versions have evolved over the years, 
                           sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                        
                        <div>
                            <MDBRating iconRegular />
                        </div>
                        
                        <form>
                            <div className="form-group">
                                <textarea 
                                    className="form-control" 
                                    rows="3"
                                    placeholder="Danh gia truyen ..." ></textarea>
                            </div>
                            <button className="btn btn-primary float-right">Luu binh luan</button>
                        </form>
                   </div>
               </div>
               <div className="row">
                   <div className="col-sm-3">
                       <h4 className="text-bold">Thong tin truyen</h4>
                       <hr/>
                        <div>
                            <strong>Tac gia: </strong>Nguyen Van A
                        </div>
                        <div>
                            <strong>Tags: </strong>Co tich, thieu nhi
                        </div>
                        <div>
                            <strong>Ngay tao: </strong>20/10/2019
                        </div>
                   </div>
                   <div className="col-sm-9">
                       <h4 className="text-bold">
                           Binh luan 
                        </h4>
                       <hr/>
                        {/* danh sach binh luan */}
                        {[1,2,3,4,5,6,7,8,9,10].map(item => (
                             <div className="row mb-3">
                                <div className="col-1 px-0">
                                    <img className="img-fluid" 
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSIXnjwudDywy5WuyASjNbpjnoRmyLKFYyvcfuJJEtqRCcUBJeb" />
                                </div>
                                <div className="col-11">
                                    <small>
                                        <strong className="mr-3">Nguyen Van B</strong>
                                        <span>10:20 21/10/2019</span>
                                    </small>
                                    <p>It is a long established fact that a reader will be distracted by the 
                                        readable content of a page when looking at its layout. 
                                        The point of using Lorem Ipsum is that
                                    </p>
                                    <span className="mr-3">
                                        <i class="far fa-thumbs-up"></i> <span className="likes-count">4</span>
                                    </span>
                                    <span>
                                        <i class="far fa-thumbs-down"></i> <span className="dislikes-count">1</span>
                                    </span>
                                   
                                </div>
                                <hr/>
                            </div>
                        ))}
                        <div className="text-center">
                            <button className="btn btn-secondary">Xem them</button>
                        </div>
                   </div>
               </div>
           </div>
        </UserLayout>
    );
};


export default StoryDetailsPage;
