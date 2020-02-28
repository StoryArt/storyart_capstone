package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.reaction.ReactionCommentDTO;

public interface ReactionService {
    void like(ReactionCommentDTO reaction);
    void dislike(ReactionCommentDTO reaction);
    void removeReaction(ReactionCommentDTO reaction);
}
