package com.storyart.commentservice.service;

import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.model.models.commentModels.CreateCommentRequestModel;
import com.storyart.commentservice.model.models.commentModels.UpdateCommentRequestModel;
import org.springframework.stereotype.Service;

import java.util.List;


public interface CommentService {
    Comment create(CreateCommentRequestModel cmt);
    Comment update(UpdateCommentRequestModel cmt);
    void delete(Integer cmtId);
    List<Comment> findAll();
    Comment findById(Integer id);

}
