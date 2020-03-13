import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MDBRating  } from 'mdbreact';
import UserLayout from '../../../layouts/UserLayout';
import StoryService from '../../../services/story.service';
import ValidationUtils from '../../../utils/validation';

import NotFound from '../../../components/common/NotFound';
import MySpinner from '../../../components/common/MySpinner';
import TagList from '../../../components/common/TagList';

const StoryDetailsPage = (props) => {

    const [story, setStory] = useState({});
    const [storyNotfound, setStoryNotfound] = useState(false);
    const [isLoadingStory, setIsLoadingStory] = useState(false);

    useEffect(() => {
        const { storyId } = props.match.params;
        getStoryDetails(storyId);
    }, []);

    const getStoryDetails = async (storyId) => {
        setIsLoadingStory(true);
        try {
            const res = await StoryService.getStoryDetails(storyId);
            console.log(res);
            if(ValidationUtils.isEmpty(res.data)){
                setStoryNotfound(true);
            } else {
                setStory(res.data);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoadingStory(false);
    }


    return (
        <UserLayout>
           <div className="container-fluid">
           {isLoadingStory && (<MySpinner/>)}

            {(!storyNotfound && !isLoadingStory && !ValidationUtils.isEmpty(story)) && (
                 <>
                 <div className="row">
                    <div className="col-sm-3">
                        <img 
                         className="img-fluid"
                         src={story.image} />
                         <div className="text-center">
                             <Link 
                                className="btn btn-success btn-block mt-2" 
                                to={`/stories/read/${story.id}`}>Doc truyen</Link>
                             {/* <Link className="btn btn-warning" to={`/stories/edit/${story.id}`}>Sua truyen</Link> */}
                         </div>
                    </div>
                    <div className="col-sm-9">
                        <h3 className="font-weight-bold">{story.title} / <small>Nguyen Van A</small></h3>
                        <strong style={{ fontSize: '1.2em' }}>{story.avgRate} stars</strong>
                        <p>{story.intro}</p>
                        <TagList tags={story.tags} />
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
                             <strong>Ngay tao: </strong>{new Date(story.createdAt).toLocaleDateString()}
                         </div>
                    </div>
                    <div className="col-sm-9">
                        <h4 className="text-bold">
                            Binh luan 
                         </h4>
                        <hr/>
                         {/* danh sach binh luan */}
                         {[1,2,3,4,5,6,7,8,9,10].map(item => (
                              <div className="row mb-3" key={item}>
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
                                         <i className="far fa-thumbs-up"></i> <span className="likes-count">4</span>
                                     </span>
                                     <span>
                                         <i className="far fa-thumbs-down"></i> <span className="dislikes-count">1</span>
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
               </>
             
            )}
            {storyNotfound && <NotFound message="Khong tim thay cau truyen nay" />}
           </div>
        </UserLayout>
    );
};


export default StoryDetailsPage;
