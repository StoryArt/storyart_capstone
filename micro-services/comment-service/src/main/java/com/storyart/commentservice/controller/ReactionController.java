package com.storyart.commentservice.controller;

import com.storyart.commentservice.dto.reaction.ReactionCommentDTO;
import com.storyart.commentservice.service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reaction")
public class ReactionController {
    @Autowired
    ReactionService reactionService;

    //@PostMapping("/like")
    //public ResponseEntity<Boolean> like(ReactionCommentDTO reaction){
    //    reactionService.like(reaction);
    //    return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    //}
}
