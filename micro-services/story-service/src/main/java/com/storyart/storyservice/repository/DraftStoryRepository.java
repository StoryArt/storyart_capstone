package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.DraftStory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface DraftStoryRepository extends JpaRepository<DraftStory, Integer> {

    @Modifying
    @Transactional
    @Query(value = "insert into draft_story(id, content, censorship_status, created_at, updated_at) " +
            "values(:#{#story.id}, :#{#story.content}, :#{#story.censorshipStatus}, :#{#story.createdAt}, :#{#story.updatedAt})",
            nativeQuery = true)
    void insert(@Param("story") DraftStory story);

    @Modifying
    @Transactional
    @Query(value = "update draft_story set censorship_status = ?1 where id = ?2",
            nativeQuery = true)
    void updateCensorshipStatus(String censorshipStatus, int id);

    @Query(value = "select censorship_status from draft_story where id = ?1", nativeQuery = true)
    String getCensorshipStatusOfStoryDraft(int storyId);

}
