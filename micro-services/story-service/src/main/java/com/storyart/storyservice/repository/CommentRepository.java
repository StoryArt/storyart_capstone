package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query(value = "SELECT count(c.id) FROM comment c where c.story_id = ?1", nativeQuery = true)
    int countCommentByStoryId (int storyId);

    @Query(value = "select count(id) from storyart_db.comment, storyart_db.reaction " +
            "where storyart_db.comment.id = storyart_db.reaction.comment_id " +
            "and storyart_db.reaction.type ='like' " +
            "and storyart_db.comment.story_id = ?1"
            , nativeQuery = true)
    int countLikeCommentByStoryId (int storyId);

    @Query(value = "select count(id) from storyart_db.comment, storyart_db.reaction " +
            "where storyart_db.comment.id = storyart_db.reaction.comment_id " +
            "and storyart_db.reaction.type ='dislike' " +
            "and storyart_db.comment.story_id = ?1"
            , nativeQuery = true)
    int countDisLikeCommentByStoryId (int storyId);


}
