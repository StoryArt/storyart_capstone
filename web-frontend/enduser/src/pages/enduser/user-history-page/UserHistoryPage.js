import React, { useState, useCallback } from 'react';
import UserLayout from '../../../layouts/UserLayout';
import {
    MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane, MDBNav, MDBModal,
    MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput,
} from 'mdbreact';
import CommentService from '../../../services/comment.service';
import ReactionService from '../../../services/reaction.service';
import moment from 'moment';


const UserHistoryPage = () => {

    const [activeItem, setActiveItem] = useState('1');

    const [modalState, setModalState] = useState({
        deleteModal: false,
        editModal: false,
        deleteReactionModal: false
    });
    const [commentIndex, setCommentIndex] = useState(-1);
    const [reactionIndex, setReactionIndex] = useState(-1);
    const [deleteRequest, setDeleteRequest] = useState({
        userId: 1,
        commentId: 0,
    });
    const deleteComment = async () => {
        try {
            const res = await CommentService.deleteComment(deleteRequest);
            setModalState({ ...modalState, deleteModal: false });
            if (commentIndex !== -1) {
                var array = [...comments];
                setComments(array.filter(item => item.id !== deleteRequest.commentId));
                //array.splice(commentIndex, 1);
                //setComments(array);
            }
        } catch (error) {
            console.log(error.response.request._response);
        }
    }
    const deleteReaction = async () => {
        try {
            const res = await ReactionService.deleteReaction(deleteRequest);
            setModalState({ ...modalState, deleteReactionModal: false });
            if (reactionIndex !== -1) {
                var array = [...reactions];
                setReactions(array.filter(item => item.commentId !== deleteRequest.commentId));
            }
        } catch (error) {
            console.log(error.response.request._response);
        }
    }
    const [modalError, setModalError] = useState('');
    const updateComment = async () => {
        try {
            const res = await CommentService.updateComment(updateCommentRequest);
            setModalState({ ...modalState, editModal: false });
            var array = [...comments];
            setComments(array.map(item => item.id === updateCommentRequest.commentId ? { ...item, content: updateCommentRequest.content } : item));
            setModalError('');
        } catch (error) {
            setModalError(error.response.data.message);
            console.log(error);
        }
    }


    const [updateCommentRequest, setUpdateCommentRequest] = useState({
        content: '',
        userId: 1,
        commentId: 0
    });
    const [comments, setComments] = useState([]);
    const [reactions, setReactions] = useState([]);
    const forceUpdateComments = useCallback(() => setComments({}), []);


    const [userId, setUserId] = useState(1);
    const [commentPageNo, setCommentPageNo] = useState(1);

    const toggle = tab => e => {
        if (activeItem !== tab) {
            setActiveItem(tab);
        }
        if (tab === "2") {
            var array = [...comments];
            if (array.length < 1) {
                getCommentHistory();
            }
        }
        if (tab === "3") {
            var array = [...reactions];
            if (array.length < 1) {
                getReactionHistory();
            }
        }
    };


    //TODO
    //const [isShowMore, setShowMore] = useState(false);
    const getCommentHistory = async () => {
        try {
            var array = [...comments];
            if (array.length > 1) {
                setCommentPageNo(commentPageNo + 1);
                const res = await CommentService.getCommentHistory(userId, commentPageNo + 1);

                res.data.content.forEach(element => {
                    setComments(comments => [...comments, element]);
                });
            }
            else {
                setCommentPageNo(1);
                const res = await CommentService.getCommentHistory(userId, 1);
                setComments(res.data.content);
            }
        } catch (error) {
        }
    }
    const [reactionPageNo, setReactionPageNo] = useState(1);
    const getReactionHistory = async () => {
        try {
            var array = [...reactions];
            if (array.length > 1) {
                setReactionPageNo(reactionPageNo + 1);
                const res = await ReactionService.getReactionHistory(userId, reactionPageNo + 1);

                res.data.content.forEach(element => {
                    setReactions(reactions => [...reactions, element]);
                });
            }
            else {
                setReactionPageNo(1);
                const res = await ReactionService.getReactionHistory(userId, 1);
                setReactions(res.data.content);
            }

        } catch (error) {
        }
    }
    const toggleModal = (modal, commentIdSpec, index) => e => {

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
        if (modal === 'deleteReactionModal') {
            setReactionIndex({ reactionIndex: index });
            if (modalState.deleteReactionModal === true) {
                setModalState({ ...modalState, deleteReactionModal: false });
            }
            else {
                setModalState({ ...modalState, deleteReactionModal: true });
            }
            setDeleteRequest({ ...deleteRequest, commentId: commentIdSpec });
        }




    }

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
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                                <div className="col-8">
                                    <div className="card mb-3">
                                        <div className="row no-gutters">
                                            <div className="col-md-4">
                                                <img src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" className="card-img" />
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

                        {comments.map((comment, index) => (
                            <div className="clearfix" key={comment.id}>
                                Bạn đã <strong>bình luận</strong> vào truyện <strong>{comment.storyName}</strong>:
                                <p> "{comment.content}"
                            </p>
                                <div>
                                    <small>{moment(comment.createdAt).format('HH:mm DD/MM/YYYY')}</small>
                                </div>
                                <button className="btn btn-danger float-right" onClick={toggleModal('deleteModal', comment.id, index)}>Xóa</button>
                                <button className="btn btn-warning float-right" onClick={toggleModal('editModal', comment.id, index)}>Chỉnh sửa</button>

                            </div>
                        ))}
                        {comments.length < 1 &&
                            <div className="text-center">
                                <small>Không có lịch sử react</small>
                            </div>
                        }
                        <br>

                        </br>

                        {comments.length > 0 &&
                            <div className="text-center">
                                <button className="btn btn-secondary" onClick={getCommentHistory}>Xem thêm</button>
                            </div>
                        }




                    </MDBTabPane>

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
                    <MDBTabPane tabId="3" role="tabpanel">

                        {reactions.map((reaction, index) => (
                            <div className="clearfix" key={reaction.id}>
                                Bạn đã <strong>{reaction.type}</strong> bình luận của <strong>{reaction.commentOwnerName}</strong> trong truyện <strong>{reaction.storyName}</strong>
                                <div>
                                    <small>{moment(reaction.createdAt).format('HH:mm DD/MM/YYYY')}</small>
                                </div>
                                <button className="btn btn-danger float-right" onClick={toggleModal('deleteReactionModal', reaction.commentId, index)}>Xóa</button>

                            </div>
                        ))}
                        {reactions.length < 1 &&
                            <div className="text-center">
                                <small>Không có lịch sử react</small>
                            </div>
                        }
                        <br>
                        </br>


                        {reactions.length > 0 &&
                            <div className="text-center">
                                <button className="btn btn-secondary" onClick={getReactionHistory}>Xem thêm</button>
                            </div>
                        }


                        <MDBModal isOpen={modalState.deleteReactionModal} toggle={toggleModal('deleteReactionModal')}>
                            <MDBModalHeader toggle={toggleModal('deleteReactionModal')}>Xóa bình luận</MDBModalHeader>
                            <MDBModalBody>
                                Bạn có muốn xóa reaction này không?
                    </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='success' onClick={toggleModal('deleteReactionModal')}>
                                    Không
                    </MDBBtn>
                                <MDBBtn color='danger' onClick={deleteReaction}>Có</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                        {/* {[1, 2, 3, 4].map(item => (
                        <div className="clearfix">
                            Ban da <strong>danh gia</strong> vao truyen <strong>Nghin le mot dem</strong> cua tac gia <strong>Nguyen Van A</strong> voi <strong>4 sao</strong>
                            <div>
                                <small>10:20 20/10/2019</small>
                            </div>
                        </div>
                    ))} */}
                    </MDBTabPane>

                </MDBTabContent>

            </div>
        </UserLayout>
    );
};


export default UserHistoryPage;
