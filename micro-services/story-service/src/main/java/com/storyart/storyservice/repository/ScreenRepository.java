package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Screen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScreenRepository extends JpaRepository<Screen, String> {
    List<Screen> findByStoryId(int storyId);
}
