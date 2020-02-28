package com.storyart.commentservice.repository;

import com.storyart.commentservice.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {
}
