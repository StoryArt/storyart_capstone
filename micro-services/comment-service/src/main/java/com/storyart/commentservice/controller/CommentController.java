package com.storyart.commentservice.controller;

import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.dto.comment.CreateCommentDTO;
import com.storyart.commentservice.dto.comment.DeleteCommentDTO;
import com.storyart.commentservice.dto.comment.UpdateCommentDTO;
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
    public Comment create(@RequestBody @Valid CreateCommentDTO commentRequestModel){
        
        return commentService.create(commentRequestModel);
    }
    @PutMapping("/update")
    public Comment update(@RequestBody @Valid UpdateCommentDTO updateCommentRequestModel){

        return commentService.update(updateCommentRequestModel);
    }

    @PostMapping("/delete")
    public Comment delete(@RequestBody @Valid DeleteCommentDTO deleteCommentRequestModel){

        return commentService.delete(deleteCommentRequestModel);
    }
}
