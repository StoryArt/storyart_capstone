package com.storyart.storyservice.repository;


import com.storyart.storyservice.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story,Integer> {

    @Query(value = "SELECT * FROM storyart_db.story", nativeQuery = true)
    List<Integer> findAllStory ();


    @Query(value = "SELECT * FROM story where id = :storyid", nativeQuery = true)
    Story findStoryById (@Param("storyid") Integer storyid);



}
