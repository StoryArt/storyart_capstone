package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Information;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InformationRepository extends JpaRepository<Information, String> {
    List<Information> findAllByStoryId(int storyId);
    void deleteAllByStoryIdEquals(int storyId);

    @Modifying
    @Transactional
    @Query(value = "delete from information i where i.story_id = ?1", nativeQuery = true)
    void deleteByStoryId(int storyId);
}
