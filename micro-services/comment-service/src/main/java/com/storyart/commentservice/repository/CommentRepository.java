package com.storyart.commentservice.repository;

import com.storyart.commentservice.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>, PagingAndSortingRepository<Comment, Integer>, JpaSpecificationExecutor<Comment> {

    @Query("SELECT e FROM Comment e WHERE e.storyId = ?1 and e.isActive=true and e.isDisableByAdmin=false ")
    List<Comment> findAllByStoryIdQuery(int storyId);


}
