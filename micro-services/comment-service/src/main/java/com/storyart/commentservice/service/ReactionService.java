package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.reaction.ReactionCommentDTO;
import com.storyart.commentservice.model.Reaction;

public interface ReactionService {
    void like(ReactionCommentDTO reaction);
    void dislike(ReactionCommentDTO reaction);
    void removeReaction(Reaction reaction);
}
