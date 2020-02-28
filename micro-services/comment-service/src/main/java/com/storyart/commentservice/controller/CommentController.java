package com.storyart.commentservice.controller;

import com.storyart.commentservice.dto.comment.*;
import com.storyart.commentservice.model.Comment;
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
    public List<ResponseCommentFromEntityDTO> getAllCommentByStoryId(
            @RequestBody @Valid RequestLoadListCommentDTO requestLoadListCommentDTO,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "numberOfLike") String sortBy){


        return commentService.findAllByStoryId(requestLoadListCommentDTO, pageNo, pageSize, sortBy);
    }
    @PostMapping
    public Comment create(@RequestBody @Valid CreateCommentDTO createCommentDTO){
        
        return commentService.create(createCommentDTO);
    }
    @PutMapping("/update")
    public Comment update(@RequestBody @Valid UpdateCommentDTO updateCommentDTO){

        return commentService.update(updateCommentDTO);
    }

    @PostMapping("/delete")
    public Comment delete(@RequestBody @Valid DeleteCommentDTO deleteCommentDTO){

        return commentService.delete(deleteCommentDTO);
    }
}
