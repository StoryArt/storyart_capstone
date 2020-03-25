package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Action;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActionRepository extends JpaRepository<Action, String> {
    List<Action> findAllByScreenId(String screenId);
    void deleteAllByScreenId(String screenId);
}
