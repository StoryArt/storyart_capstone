package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Tag findByTitle(String title);

    Page<Tag> findAll(Pageable sort);
}
