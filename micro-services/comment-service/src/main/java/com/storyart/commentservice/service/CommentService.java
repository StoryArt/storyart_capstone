package com.storyart.commentservice.service;

import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.dto.comment.CreateCommentDTO;
import com.storyart.commentservice.dto.comment.DeleteCommentDTO;
import com.storyart.commentservice.dto.comment.UpdateCommentDTO;

import java.util.List;


public interface CommentService {
    Comment create(CreateCommentDTO cmt);
    Comment update(UpdateCommentDTO cmt);
    Comment delete(DeleteCommentDTO cmt);
    List<Comment> findAll();
    Comment findById(Integer id);

}
