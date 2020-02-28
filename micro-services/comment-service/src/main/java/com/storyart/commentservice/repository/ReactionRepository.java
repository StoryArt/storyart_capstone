package com.storyart.commentservice.repository;

import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {
    @Query("SELECT r FROM Reaction r WHERE r.commentId = ?1 AND r.userId = ?2")
    Optional<Reaction> findReactionByCommentIdAndUserId(int commentId, int userId);
}
