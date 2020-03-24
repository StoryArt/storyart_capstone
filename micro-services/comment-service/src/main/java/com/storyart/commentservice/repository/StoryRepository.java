package com.storyart.commentservice.repository;

import com.storyart.commentservice.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Integer> {

}
