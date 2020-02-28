package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.comment.*;
import com.storyart.commentservice.model.Comment;

import java.util.List;


public interface CommentService {
    Comment create(CreateCommentDTO cmt);
    Comment update(UpdateCommentDTO cmt);
    Comment delete(DeleteCommentDTO cmt);
    List<ResponseCommentFromEntityDTO> findAllByStoryId(RequestLoadListCommentDTO request, int pageNo, int pageSize, String sortBy);
    Comment findById(Integer id);

}
