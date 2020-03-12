package com.storyart.commentservice.controller;

import com.storyart.commentservice.dto.comment.*;
import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/comment")
@CrossOrigin(origins = "*")
public class CommentController {
    @Autowired
    CommentService commentService;

    @PostMapping("/getAll")
    public Page<ResponseListCommentDTO> getAllCommentByStoryId(
            @RequestBody @Valid RequestLoadListCommentDTO requestLoadListCommentDTO,
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "reactions") String sortBy){

        pageNo = pageNo -1;
        if(pageNo<0){
            pageNo = 0;
        }
        return commentService.findAllByStoryId(requestLoadListCommentDTO, pageNo, pageSize, sortBy);
    }
    @PostMapping
    public ResponseListCommentDTO create(@RequestBody @Valid CreateCommentDTO createCommentDTO){
        
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

    @PostMapping("/disableAndEnableCommentByAdmin")
    public ResponseEntity<Boolean> disableByAdmin(@RequestParam (defaultValue = "0") Integer commentId ){
        commentService.disableAndEnableComment(commentId);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @GetMapping("/getCommentHistory")
    public Page<CommentHistoryResponseDTO> getCommentHistory(
            @RequestParam(defaultValue = "0") Integer userId,
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize){
        pageNo = pageNo -1;
        if(pageNo<0){
            pageNo = 0;
        }
        return commentService.getCommentHistory(userId, pageNo, pageSize);
    }
}
