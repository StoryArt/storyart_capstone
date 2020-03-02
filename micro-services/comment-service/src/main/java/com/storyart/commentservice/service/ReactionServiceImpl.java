package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.reaction.ReactionCommentDTO;
import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.model.Reaction;
import com.storyart.commentservice.repository.CommentRepository;
import com.storyart.commentservice.repository.ReactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class ReactionServiceImpl implements ReactionService {
    @Autowired
    ReactionRepository reactionRepository;
    @Autowired
    CommentRepository commentRepository;


    @Override
    public void like(ReactionCommentDTO reactionDTO) {
        Optional<Reaction> reaction = reactionRepository.findReactionByCommentIdAndUserId(reactionDTO.getCommentId(), reactionDTO.getUserId());
        Optional<Comment> comment = commentRepository.findById(reactionDTO.getCommentId());
        if(!comment.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Comment doesn't exist!");
        }
        if(reaction.isPresent()){
            Reaction updateReaction = reaction.get();
            updateReaction.setType("like");

            reactionRepository.save(updateReaction);
        }
        else {
            Reaction newReaction = new Reaction();
            newReaction.setComment(comment.get());
            newReaction.setUserId(reactionDTO.getUserId());
            newReaction.setType("like");

            reactionRepository.save(newReaction);
        }
    }

    @Override
    public void dislike(ReactionCommentDTO reactionDTO) {
        Optional<Reaction> reaction = reactionRepository.findReactionByCommentIdAndUserId(reactionDTO.getCommentId(), reactionDTO.getUserId());
        Optional<Comment> comment = commentRepository.findById(reactionDTO.getCommentId());
        if(reaction.isPresent()){
            Reaction updateReaction = reaction.get();
            updateReaction.setType("dislike");

            reactionRepository.save(updateReaction);
        }
        else {
            Reaction newReaction = new Reaction();
            newReaction.setComment(comment.get());
            newReaction.setUserId(reactionDTO.getUserId());
            newReaction.setType("dislike");

            reactionRepository.save(newReaction);
        }

    }

    @Override
    public void removeReaction(Reaction reaction) {
        reactionRepository.delete(reaction);
    }
}
