package com.storyart.storyservice.service;

import com.storyart.storyservice.model.Tag;

import java.util.List;

public interface TagService {

    void create(Tag tag);

    void update(Tag tag);

    void delete(Integer id);

    List<Tag> findAll();

    Tag findById(Integer id);
    List<Tag> findTagLIKETitle(String title);

    List<Tag> findTagByIs_activeIsFalse();
    List<Tag> findTagByIs_activeIsTrue();

    void disableTagById(int id);

    void activeTagById(int id);

}
