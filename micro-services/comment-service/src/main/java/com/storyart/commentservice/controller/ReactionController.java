package com.storyart.commentservice.controller;

import com.storyart.commentservice.dto.reaction.ReactionCommentDTO;
import com.storyart.commentservice.dto.reaction.ReactionHistoryResponseDTO;
import com.storyart.commentservice.model.Reaction;
import com.storyart.commentservice.service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/reaction")
@CrossOrigin(origins = "*")
public class ReactionController {
    @Autowired
    ReactionService reactionService;

    @Secured({"ROLE_USER"})
    @PostMapping("/react")
    public ResponseEntity<Boolean> react(@RequestBody @Valid ReactionCommentDTO reactionDTO){
        reactionService.react(reactionDTO);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    //@PostMapping("/like")
    //public ResponseEntity<Boolean> like(@RequestBody @Valid ReactionCommentDTO reactionDTO){
    //    reactionService.like(reactionDTO);
    //    return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    //}
//
    //@PostMapping("/dislike")
    //public ResponseEntity<Boolean> dislike(@RequestBody @Valid ReactionCommentDTO reactionDTO){
    //    reactionService.dislike(reactionDTO);
    //    return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    //}
    @Secured({"ROLE_USER"})
    @PostMapping("/delete")
    public ResponseEntity<Boolean> removeReaction(@RequestBody @Valid ReactionCommentDTO reactionDTO){
        reactionService.removeReaction(reactionDTO);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }
    @Secured({"ROLE_USER"})
    @GetMapping("/getReactionHistory")
    public Page<ReactionHistoryResponseDTO> getReactionHistory(
            @RequestParam(defaultValue = "0") Integer userId,
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize){
        pageNo = pageNo -1;
        if(pageNo<0){
            pageNo = 0;
        }
        return reactionService.getReactionHistory(userId,pageNo,pageSize);
    }
}
