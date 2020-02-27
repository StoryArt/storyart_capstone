package com.storyart.commentservice.controller;

import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.model.models.commentModels.CreateCommentRequestModel;
import com.storyart.commentservice.model.models.commentModels.UpdateCommentRequestModel;
import com.storyart.commentservice.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/comment")
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping
    public List<Comment> getAllComment(){
        List<Comment> comments = commentService.findAll();
        return comments;
    }
    @PostMapping
    public Comment create(@RequestBody @Valid CreateCommentRequestModel commentRequestModel){
        
        return commentService.create(commentRequestModel);
    }
    @PostMapping("/update")
    public Comment update(@RequestBody @Valid UpdateCommentRequestModel updateCommentRequestModel){

        return commentService.update(updateCommentRequestModel);
    }
}
