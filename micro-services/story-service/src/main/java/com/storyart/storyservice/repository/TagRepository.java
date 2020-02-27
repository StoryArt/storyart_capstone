package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TagRepository  extends JpaRepository<Tag, Integer> {

    Tag findTagByTitle(String tagTitle);
}
