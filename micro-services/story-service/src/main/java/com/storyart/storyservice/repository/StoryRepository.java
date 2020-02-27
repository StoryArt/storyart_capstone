package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Integer> {

}
