package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Story;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface StoryRepository extends JpaRepository<Story, Integer> {
    @Query(value = "select * from story s WHERE (s.title like %?1% or s.intro like %?1%) " +
            "and s.is_active = ?3 and s.is_published = ?4 and s.id in " +
            "(select distinct story_id from story_tag st where st.tag_id in ?2)",

            countQuery = "select count(*) from story s WHERE (s.title like %?1% or s.intro like %?1%) " +
                    "and s.is_active = ?3 and s.is_published = ?4 and s.id in " +
                    "(select distinct story_id from story_tag st where st.tag_id in ?2)",

            nativeQuery = true)
    Page<Story> findAllBySearchCondition(String title, Set<Integer> tagIds,
                                boolean isActive, boolean isPublished, Pageable pageable);

}
