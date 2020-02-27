package com.storyart.storyservice.service;


import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagServiceImp implements TagService {
@Autowired
    TagRepository tagRepository;

    @Override
    public void create(Tag tag) {
    tagRepository.save(tag);
    }

    @Override
    public void update(Tag tag) {
    tagRepository.save(tag);
    }

    @Override
    public void delete(Integer id) {
        tagRepository.deleteById(id);
    }

    @Override
    public List<Tag> findAll() {
        List<Tag> list = tagRepository.findAll();
        return list;
    }

    @Override
    public Tag findById(Integer id) {
        Optional<Tag> option = tagRepository.findById(id);
        if(option.isPresent()){
            return option.get();
        }
        return null;
    }

    @Override
    public List<Tag> findTagLIKETitle(String title) {
        List<Tag> tagByTitle = tagRepository.findTagLikeTitle(title);

        return tagByTitle;
    }

    @Override
    public List<Tag> findTagByIs_activeIsFalse() {
        List<Tag> taglist = tagRepository.findTagByIs_activeFalse();
        return taglist;
    }

    @Override
    public List<Tag> findTagByIs_activeIsTrue() {
        List<Tag> taglist = tagRepository.findTagByIs_active();
        return taglist;
    }

    @Override
    public void disableTagById(int id) {
         tagRepository.disableTagById(id);

    }
    @Override
    public void activeTagById(int id) {
        tagRepository.activeTagById(id);
        ;
    }
}
