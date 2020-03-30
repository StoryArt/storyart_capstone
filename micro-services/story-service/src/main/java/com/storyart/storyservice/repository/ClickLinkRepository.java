package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.ClickLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;


public interface ClickLinkRepository extends JpaRepository<ClickLink, Integer> {
    List<ClickLink> findByStoryIdAndCreatedAtBetweenOrderByCreatedAtDesc(int storyId, Date startDate, Date endDate);
}
