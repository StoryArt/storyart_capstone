package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.StoryTag;
import com.storyart.storyservice.model.ids.StoryTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StoryTagRepository extends JpaRepository<StoryTag, StoryTagId> {
    List<StoryTag> findAllByStoryId(int storyId);

    @Modifying
    @Transactional
    @Query(value = "delete from story_tag st where st.story_id = ?1", nativeQuery = true)
    void deleteByStoryId(int storyId);

    @Modifying
    @Transactional
    @Query(value = "insert into story_tag(story_id, tag_id) values(:#{#st.storyId}, :#{#st.tagId})", nativeQuery = true)
    void insertStoryTag(@Param("st") StoryTag st);
}
