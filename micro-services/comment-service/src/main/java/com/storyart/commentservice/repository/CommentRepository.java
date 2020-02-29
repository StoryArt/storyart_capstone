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

    //@Query(value = "select x.id, x.type, count(*), x.content,x.create_at, x.user_id, x.is_active, x.is_disable_by_admin,x.story_id,x.update_at from (select c.id, r.type , c.content,c.create_at, c.user_id, c.is_active, c.is_disable_by_admin,c.story_id,c.update_at from comment c, reaction r WHERE c.id = r.comment_id) as x where x.type='dislike' group by x.id", nativeQuery = true)
    //List<R>

}
