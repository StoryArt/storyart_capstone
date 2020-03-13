package com.storyart.storyservice.service;

import com.storyart.storyservice.model.AddTagDTO;
import com.storyart.storyservice.model.Tag;

import java.util.List;

public interface TagService {

    Tag create(AddTagDTO tag);

    Tag update(AddTagDTO tag);
    List<Tag> findAll();
    Tag updateStatus(Tag tag);
    Tag findById(Integer id);
   // List<Tag> findTagsByActive(boolean isActive);


}
