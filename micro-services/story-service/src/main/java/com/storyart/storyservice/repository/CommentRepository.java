package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query(value = "SELECT count(c.id) FROM comment c where c.story_id = ?1", nativeQuery = true)
    int countCommentByStoryId (int storyId);
}
