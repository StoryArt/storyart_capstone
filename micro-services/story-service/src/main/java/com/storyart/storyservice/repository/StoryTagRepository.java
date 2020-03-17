package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.StoryTag;
import com.storyart.storyservice.model.ids.StoryTagId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryTagRepository extends JpaRepository<StoryTag, StoryTagId> {
}
