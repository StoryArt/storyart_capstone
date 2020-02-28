package com.storyart.commentservice.controller;

import com.storyart.commentservice.dto.reaction.ReactionCommentDTO;
import com.storyart.commentservice.model.Reaction;
import com.storyart.commentservice.service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/reaction")
public class ReactionController {
    @Autowired
    ReactionService reactionService;

    @PostMapping("/like")
    public ResponseEntity<Boolean> like(@RequestBody @Valid ReactionCommentDTO reactionDTO){
        reactionService.like(reactionDTO);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @PostMapping("/dislike")
    public ResponseEntity<Boolean> dislike(@RequestBody @Valid ReactionCommentDTO reactionDTO){
        reactionService.dislike(reactionDTO);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> removeReaction(@RequestBody @Valid Reaction reaction){
        reactionService.removeReaction(reaction);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }
}
