package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.reaction.ReactionCommentDTO;
import com.storyart.commentservice.model.Reaction;
import com.storyart.commentservice.repository.ReactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReactionServiceImpl implements ReactionService {
    @Autowired
    ReactionRepository reactionRepository;


    @Override
    public void like(ReactionCommentDTO reactionDTO) {
        Optional<Reaction> reaction = reactionRepository.findReactionByCommentIdAndUserId(reactionDTO.getCommentId(), reactionDTO.getUserId());
        if(reaction.isPresent()){
            Reaction updateReaction = reaction.get();
            updateReaction.setType("like");

            reactionRepository.save(updateReaction);
        }
        else {
            Reaction newReaction = new Reaction();
            newReaction.setCommentId(reactionDTO.getCommentId());
            newReaction.setUserId(reactionDTO.getUserId());
            newReaction.setType("like");

            reactionRepository.save(newReaction);
        }
    }

    @Override
    public void dislike(ReactionCommentDTO reactionDTO) {
        Optional<Reaction> reaction = reactionRepository.findReactionByCommentIdAndUserId(reactionDTO.getCommentId(), reactionDTO.getUserId());
        if(reaction.isPresent()){
            Reaction updateReaction = reaction.get();
            updateReaction.setType("dislike");

            reactionRepository.save(updateReaction);
        }
        else {
            Reaction newReaction = new Reaction();
            newReaction.setCommentId(reactionDTO.getCommentId());
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
