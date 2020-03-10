package com.storyart.storyservice.service;

import com.storyart.storyservice.model.AddTagDTO;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.model.Tag;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TagService {

    Tag create(AddTagDTO tag);

    Tag update(AddTagDTO tag);

    Tag updateStatus(AddTagDTO tag);
    Page<Tag> findAll();
    Tag findById(Integer id);





}
