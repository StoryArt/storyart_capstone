package com.storyart.storyservice.service;


import com.storyart.storyservice.model.AddTagDTO;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import sun.security.provider.certpath.OCSPResponse;

import java.util.HashMap;
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
        if(tagRepository.findTagByTitle(tagDTO.getTitle()) != null ) {
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED, "Sorry Tag Title existed ");
        }
        Tag tag = new Tag();
        tag.setTitle(tagDTO.getTitle());
        tag.setActive(true);
        tagRepository.save(tag);
        return tag;
    }

    @Override
    public Tag update(Tag tag) {
        //check tag do exist
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
