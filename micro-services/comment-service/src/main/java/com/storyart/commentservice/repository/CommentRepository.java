package com.storyart.commentservice.repository;

import com.storyart.commentservice.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>, PagingAndSortingRepository<Comment, Integer>, JpaSpecificationExecutor<Comment> {
    @Query("select c FROM Comment c LEFT JOIN Reaction r ON c.id = r.comment.id where c.storyId = ?1 and c.isActive=true and c.isDisableByAdmin= false GROUP BY c.id order by count(r.comment.id) desc")
    Page<Comment> findAllByStoryIdAndOrderByReactions(int storyId,Pageable pageable);

    @Query("select c from Comment c where c.storyId = ?1 and c.isActive=true and c.isDisableByAdmin= false order by c.createAt desc")
    Page<Comment> findAllByStoryIdAndOrderByCreateAt(int storyId,Pageable pageable);
}
