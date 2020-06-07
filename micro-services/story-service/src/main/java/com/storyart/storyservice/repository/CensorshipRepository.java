package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Censorship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CensorshipRepository extends JpaRepository<Censorship, Integer> {
    @Query(value = "select * from censorship where story_id = ?1 order by id desc", nativeQuery = true)
    List<Censorship> findAllByStory(int storyId);

    @Query(value = "select * from censorship where story_id = ?1 order by id desc LIMIT 1", nativeQuery = true)
    Censorship findLatestCensorshipByStory(int storyId);
}
