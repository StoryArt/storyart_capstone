import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MDBModal, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle,
    MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput, MDBRating } from 'mdbreact';
import CommentService from '../../../services/comment.service';
import ReactionService from '../../../services/reaction.service';
import ReportService from '../../../services/report.service';
import moment from 'moment';

import UserLayout from '../../../layouts/UserLayout';
import StoryService from '../../../services/story.service';
import ValidationUtils from '../../../utils/validation';

import NotFound from '../../../components/common/NotFound';
import MySpinner from '../../../components/common/MySpinner';
import TagList from '../../../components/common/TagList';

const StoryDetailsPage = (props) => {
    console.log(props.match.params.storyId);

    const [story, setStory] = useState({});
    const [storyNotfound, setStoryNotfound] = useState(false);
    const [isLoadingStory, setIsLoadingStory] = useState(false);
    const [modalState, setModalState] = useState({
        deleteModal: false,
        editModal: false,
        reportModal: false
    });
    const [commentIndex, setCommentIndex] = useState(-1);

    const [deleteRequest, setDeleteRequest] = useState({
        userId: 1,
        commentId: 0,
    });
    
    const [updateCommentRequest, setUpdateCommentRequest] = useState({
        content: '',
        userId: 1,
        commentId: 0
    });

    const [modalError, setModalError] = useState('');
    
    const [comments, setComments] = useState([]);
    const [sortBy, setSortBy] = useState('reaction');
    // const modifySortBy = sortString => {
    //     setSortBy(sortString);
    //     getComments("sort");
    // };
    const [isOpenModal, setOpen] = useState(false);

    const [commentError, setCommentError] = useState('');
    const [sendCommentRequest, setSendCommentRequest] = useState({
        storyId: props.match.params.storyId,
        userId: 1,
        content: ''
    });

    const [getCommentsRequestBody, setGetCommentsRequestBody] = useState({
        userId: 1,
        storyId: props.match.params.storyId
    });
    const [reportCommentRequest, setReportCommentRequest] = useState({
        userId: 1,
        commentId: 0,
        content: ''
    });
    const [reportCommentModalInfo, setReportCommentModalInfo] = useState({
        userName: '',
        comment: '',
    });
    const [pageNo, setPageNo] = useState(1);
    const [userId, setUserId] = useState(1);
    const [reactRequest, setReactReqeust] = useState({
        userId: 1,
        commentId: 0,
        type: ''
    });

    const updateComment = async () => {
        try {
            const res = await CommentService.updateComment(updateCommentRequest);
            setModalState({ ...modalState, editModal: false });
            var array = [...comments];
            setComments(array.map(item => item.id === updateCommentRequest.commentId ? { ...item, content: updateCommentRequest.content } : item));
            setModalError('');
        } catch (error) {
            setModalError(error.response.data.message);
        }
    }

    const toggleModal = (modal, commentIdSpec, index, username, content) => e => {

        if (modal === 'deleteModal') {
            setCommentIndex({ commentIndex: index });
            if (modalState.deleteModal === true) {
                setModalState({ ...modalState, deleteModal: false });
            }
            else {
                setModalState({ ...modalState, deleteModal: true });
            }
            setDeleteRequest({ ...deleteRequest, commentId: commentIdSpec });
        }
        if (modal === 'editModal') {
            setCommentIndex({ commentIndex: index });
            if (modalState.editModal === true) {
                setModalState({ ...modalState, editModal: false });
                setModalError('');
            }
            else {
                setModalState({ ...modalState, editModal: true });
                setUpdateCommentRequest({ ...updateCommentRequest, commentId: commentIdSpec, content: comments[index].content });
            }
        }
        if (modal === 'reportModal') {
            setReportCommentModalInfo({ userName: username, comment: content });
            if (modalState.reportModal === true) {
                setModalState({ ...modalState, reportModal: false });
                setModalError('');
            }
            else {
                setModalState({ ...modalState, reportModal: true });
            }
            setReportCommentRequest({ ...reportCommentRequest, commentId: commentIdSpec });

        }
    }

    const deleteComment = async () => {
        try {
            const res = await CommentService.deleteComment(deleteRequest);
            setModalState({ ...modalState, deleteModal: false });
            if (commentIndex !== -1) {
                var array = [...comments];
                setComments(array.filter(item => item.id !== deleteRequest.commentId));
            }
        } catch (error) {
            console.log(error.response.request._response);
        }
    }

    const sendComment = async () => {

        try {
            const res = await CommentService.addComment(sendCommentRequest);
            setSendCommentRequest({ ...sendCommentRequest, content: '' });
            //setComments(...comments, comments.unshift(res.data));
            var array = [...comments];
            array.unshift(res.data);
            setComments(array);
            setCommentError('');
        } catch (error) {
            setCommentError(error.response.data.message);
        }
    }
    
    const getCommentsBySort = async (sortString) => {
        setSortBy(sortString);
        setPageNo(1);
        const res = await CommentService.getComments(1, sortString, getCommentsRequestBody);
        setComments(res.data.content);
    }

    const getComments = async () => {
        try {
            var array = [...comments];
            if (array.length > 1) {
                setPageNo(pageNo + 1);
                const pageNumber = pageNo + 1;
                const res = await CommentService.getComments(pageNumber, sortBy, getCommentsRequestBody);

                res.data.content.forEach(element => {
                    setComments(comments => [...comments, element]);
                });
            }
            else {
                const res = await CommentService.getComments(pageNo, sortBy, getCommentsRequestBody);
                setComments(res.data.content);
            }



        } catch (error) {
            //console.log(error.response.request._response);
        }
    }

    const reportComment = async () => {
        try {
            const res = await ReportService.reportComment(reportCommentRequest);
            setReportCommentRequest({ ...reportCommentRequest, content: '' });
            setModalState({ ...modalState, reportModal: false });
            setModalError('');
        } catch (error) {
            setModalError(error.response.data.message);
            //console.log(error.response.request._response);
        }
    }

    const like = async (type, commentId) => {
        try {
            const request = { ...reactRequest };
            request.userId = userId;
            request.commentId = commentId;
            request.type = "like";

            const res = await ReactionService.react(request);

            var array = [...comments];

            if (type) {
                setComments(array.map(item => item.id === commentId ?
                    { ...item, likes: item.likes.filter(like => like !== userId) }
                    : item));
            }
            else {
                setComments(array.map(item => item.id === commentId ?
                    { ...item, ...item.likes.push(userId) }
                    : item));
                setComments(array.map(item => item.id === commentId ?
                    { ...item, dislikes: item.dislikes.filter(like => like !== userId) }
                    : item));
            }
        } catch (error) {

        }

    }

    const dislike = async (type, commentId) => {
        try {
            const request = { ...reactRequest };
            request.userId = userId;
            request.commentId = commentId;
            request.type = "dislike";

            const res = await ReactionService.react(request);

            var array = [...comments];
            if (type) {
                setComments(array.map(item => item.id === commentId ?
                    { ...item, dislikes: item.dislikes.filter(like => like !== userId) }
                    : item));
            }
            else {
                setComments(array.map(item => item.id === commentId ?
                    { ...item, ...item.dislikes.push(userId) }
                    : item));
                setComments(array.map(item => item.id === commentId ?
                    { ...item, likes: item.likes.filter(like => like !== userId) }
                    : item));
            }
        } catch (error) {

        }

    }

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

    useEffect(() => {
        getComments();
    }, []);

    useEffect(() => {
        const { storyId } = props.match.params;
        getStoryDetails(storyId);
    }, []);

    const reacted = {
        color: 'blue'
    };

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
                        <strong style={{ fontSize: '1.2em', color: 'orange' }}>Diem trung binh: {story.avgRate}</strong>
                        <div className="my-3">
                            <strong>Gioi thieu</strong>
                            <p>{story.intro}</p>
                        </div>
                        <strong>Tags:</strong> <TagList tags={story.tags} />
                         <div className="my-3">
                             <strong>Danh gia truyen:</strong> <MDBRating iconRegular />
                         </div>
                         
                         {commentError.length > 0 && <small style={{ color: 'red' }}>(*){commentError}</small>}
                        <form onSubmit={e => { e.preventDefault(); sendComment(); }}>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Bình luận..."
                                    value={sendCommentRequest.content}
                                    onChange={e => setSendCommentRequest({ ...sendCommentRequest, content: e.target.value })}></textarea>
                            </div>
                            <button className="btn btn-primary float-right" type="submit">Gửi</button>
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
                         <div className="row">
                            <div className="col-sm-4">
                                <h4 className="text-bold">
                                    Bình luận
                                </h4>
                            </div>
                           <div className="col-sm-8">
                            <MDBDropdown className="float-right">
                                    <MDBDropdownToggle caret color="ins">
                                        Sắp xếp
                                </MDBDropdownToggle>
                                    <MDBDropdownMenu basic >
                                        <MDBDropdownItem onClick={e => getCommentsBySort('reaction')}>Nổi bật</MDBDropdownItem>
                                        <MDBDropdownItem onClick={e => getCommentsBySort('createdAt')}>Mới nhất</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                           </div>
                        </div>
                         {/* danh sach binh luan */}
                         {comments.map((comment, index) => (
                            <div className="row mb-3" key={comment.id}>
                                <div className="col-1 px-0">
                                    <img className="img-fluid"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSIXnjwudDywy5WuyASjNbpjnoRmyLKFYyvcfuJJEtqRCcUBJeb" />
                                </div>
                                <div className="col-11">
                                    <small>
                                        <strong className="mr-3">{comment.username}</strong>
                                        <span>{moment(comment.createdAt).format('HH:mm DD/MM/YYYY')}</span>
                                    </small>
                                    <p>{comment.content}
                                    </p>

                                    {/* <span className="mr-3" >
                                        <i class="far fa-thumbs-up" id="like-icon" style={{ color: 'blue' }}></i> <span className="likes-count">{comment.likes.length}</span>
                                    </span> */}
                                    <span className="mr-3" >
                                        <i class={comment.likes.includes(userId) ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
                                            onClick={e => like(comment.likes.includes(userId), comment.id)}
                                            style={{ cursor: 'pointer' }}>
                                        </i>
                                        <span className="likes-count"> {comment.likes.length}</span>
                                    </span>
                                    <span className="mr-3">
                                        <i class={comment.dislikes.includes(userId) ? "fas fa-thumbs-down" : "far fa-thumbs-down"}
                                            onClick={e => dislike(comment.dislikes.includes(userId), comment.id)}
                                            style={{ cursor: 'pointer' }}>
                                        </i>
                                        <span className="dislikes-count"> {comment.dislikes.length}</span>
                                    </span>
                                    {userId !== comment.userId &&
                                        <button type="button" class="btn btn-danger" onClick={toggleModal('reportModal', comment.id, index, comment.username, comment.content)}>
                                            <i class="far fa-flag" ></i>
                                        </button>
                                    }
                                    {userId === comment.userId &&
                                        <button type="button" class="btn btn-warning" onClick={toggleModal('editModal', comment.id, index)}>
                                            <i class="far fa-edit" ></i>
                                        </button>

                                    }
                                    {userId === comment.userId &&
                                        <button type="button" class="btn btn-warning" onClick={toggleModal('deleteModal', comment.id, index)}>
                                            <i class="far fa-trash-alt" ></i>
                                        </button>
                                    }



                                </div>
                                <hr />
                            </div>
                        ))}
                        <MDBModal isOpen={modalState.editModal} toggle={toggleModal('editModal')}>
                            <MDBModalHeader toggle={toggleModal('editModal')}>Chỉnh sửa bình luận</MDBModalHeader>
                            <MDBModalBody>
                                {modalError.length > 0 && <small style={{ color: 'red' }}>(*){modalError}</small>}
                                <form className='mx-3 grey-text'>
                                    <MDBInput
                                        type='textarea'
                                        rows='2'
                                        label='Nội dung bình luận'
                                        value={updateCommentRequest.content}
                                        onChange={e => setUpdateCommentRequest({ ...updateCommentRequest, content: e.target.value })}
                                    />
                                </form>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='success' onClick={toggleModal('editModal')}>
                                    Hủy
                                        </MDBBtn>
                                <MDBBtn color='warning' onClick={updateComment}>Chỉnh sửa</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                        <MDBModal isOpen={modalState.deleteModal} toggle={toggleModal('deleteModal')}>
                            <MDBModalHeader toggle={toggleModal('deleteModal')}>Xóa bình luận</MDBModalHeader>
                            <MDBModalBody>
                                Bạn có muốn xóa bình luận này không?
                        </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='success' onClick={toggleModal('deleteModal')}>
                                    Không
                        </MDBBtn>
                                <MDBBtn color='danger' onClick={deleteComment}>Có</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                        <MDBModal isOpen={modalState.reportModal} toggle={toggleModal('reportModal')}>
                            <MDBModalHeader toggle={toggleModal('reportModal')}>Báo cáo bình luận</MDBModalHeader>
                            <MDBModalBody>
                                <p>Người dùng: <strong>{reportCommentModalInfo.userName}</strong></p>
                                <p>Nội dung bình luận: <strong>"{reportCommentModalInfo.comment}"</strong></p>
                                {modalError.length > 0 && <small style={{ color: 'red' }}>(*){modalError}</small>}
                                <form className='mx-3 grey-text'>
                                    <MDBInput
                                        type='textarea'
                                        rows='2'
                                        label='Nội dung báo cáo'
                                        onChange={e => setReportCommentRequest({ ...reportCommentRequest, content: e.target.value })}
                                    />
                                </form>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='success' onClick={toggleModal('reportModal')}>
                                    Hủy
                                        </MDBBtn>
                                <MDBBtn color='danger' onClick={reportComment}>Gửi</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                        
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
