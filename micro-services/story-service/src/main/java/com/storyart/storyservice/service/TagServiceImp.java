package com.storyart.storyservice.service;


import com.storyart.storyservice.model.AddTagDTO;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TagServiceImp implements TagService {
@Autowired
    TagRepository tagRepository;


    @Override
    public Tag create(AddTagDTO tagDTO) {
       if(tagDTO.getTitle().isEmpty()){
           throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED, "Sorry Tag Title is required ");
       }
       Tag checktag = tagRepository.findByTitle(tagDTO.getTitle());
        if(checktag != null ) {
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED, "Sorry Tag Title existed ");
        }
        Tag tag = new Tag();
        tag.setTitle(tagDTO.getTitle());
        tag.setActive(true);
        tagRepository.save(tag);
        return tag;
    }


   /* @Override
    public List<Tag> findTagsByActive(boolean isActive) {
        List<Tag> listTag = tagRepository.findTagsByActive(isActive);
        return listTag;
    }
*/
    @Override
    public Tag update(AddTagDTO tagDTO) {
        if(tagDTO.getTitle().isEmpty()){
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED, "Sorry Tag Title is required ");
        }
        Optional<Tag> tagCheck = tagRepository.findById(tagDTO.getId());
        if(!tagCheck.isPresent())
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sorry, Tag do not exist ");
        }

        Tag tag = tagCheck.get();
        tag.setTitle(tagDTO.getTitle());
        return tagRepository.save(tag);
    }

    @Override
    public Tag updateStatus(Tag tag) {
        return tagRepository.save(tag);
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

}
