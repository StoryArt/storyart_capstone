package com.storyart.storyservice.service;

import com.storyart.storyservice.model.AddTagDTO;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.model.Tag;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TagService {

    Tag create(AddTagDTO tag);

    Tag update(AddTagDTO tag);
<<<<<<< HEAD
    List<Tag> findAll();
    Tag updateStatus(Tag tag);
=======

    Tag updateStatus(AddTagDTO tag);
    Page<Tag> findAll();
>>>>>>> 3406f8c119691ba2baabbc8e48d0a6f2ab2a9254
    Tag findById(Integer id);
   // List<Tag> findTagsByActive(boolean isActive);





}
