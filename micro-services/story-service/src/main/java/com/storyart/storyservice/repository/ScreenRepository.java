package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SectionRepository extends JpaRepository<Section, Integer> {
    List<Section> findByStoryId(int storyId);
}
