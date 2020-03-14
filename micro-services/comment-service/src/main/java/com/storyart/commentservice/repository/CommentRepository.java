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
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("select c FROM Comment c LEFT JOIN Reaction r ON c.id = r.comment.id " +
            "where c.story.id = ?1 and c.isActive=true and c.isDisableByAdmin= false GROUP BY c.id " +
            "order by count(r.comment.id) desc")
    Page<Comment> findAllByStoryIdAndOrderByReactions(int storyId, Pageable pageable);

    @Query("select c from Comment c where c.story.id = ?1 and c.isActive=true " +
            "and c.isDisableByAdmin = false order by c.createdAt desc")//createdAt nha, thong nhat la createdAt updatedAt ok e
    Page<Comment> findAllByStoryIdAndOrderBycreatedAt(int storyId, Pageable pageable); //cho nay anh ko nen fix cung isActive=true
    ///anh ne truyen param vao, de sau nay minh dung cho nhieu truong hop, ok

    @Query("select c from  Comment c where c.user.id =?1 and c.isActive=true and c.isDisableByAdmin = false order by c.createdAt desc")
    Page<Comment> findAllByUserId(int userId, Pageable pageable);
}
