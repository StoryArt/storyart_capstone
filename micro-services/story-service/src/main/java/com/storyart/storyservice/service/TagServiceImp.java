package com.storyart.storyservice.service;


import com.storyart.storyservice.model.AddTagDTO;
import com.storyart.storyservice.model.HistoryDTO;
import com.storyart.storyservice.model.ReadingHistory;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.repository.HistoryRepository;
import com.storyart.storyservice.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    @Override
    public Tag updateStatus(AddTagDTO tagDTO) {

        Optional<Tag> tagCheck = tagRepository.findById(tagDTO.getId());
        Tag tag = tagCheck.get();
        if (!tagCheck.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sorry, Tag do not exist ");
        } else if (tagDTO.getTitle().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED, "Sorry Tag Title is required ");
        } else {
            tag.setTitle(tagDTO.getTitle());
            boolean flag = tagDTO.isActive();
            if (!flag) {
                tag.setActive(false);
            } else {
                tag.setActive(true);
            }
            tagRepository.save(tag);
        }
        return tag;
    }

<<<<<<< HEAD
   /* @Override
    public List<Tag> findTagsByActive(boolean isActive) {
        List<Tag> listTag = tagRepository.findTagsByActive(isActive);
        return listTag;
    }
*/
=======
    /* @Override
         public List<Tag> findTagsByActive(boolean isActive) {
             List<Tag> listTag = tagRepository.findTagsByActive(isActive);
             return listTag;
         }
     */
>>>>>>> 3406f8c119691ba2baabbc8e48d0a6f2ab2a9254
    @Override
    public Tag update(AddTagDTO tagDTO) {
        if(tagDTO.getTitle().isEmpty()){
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED, "Sorry Tag Title is required ");
        }
        Optional<Tag> tagCheck = tagRepository.findById(tagDTO.getId());
        if(!tagCheck.isPresent())
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sorry, Tag do not exist ");
<<<<<<< HEAD
=======
        } else if (tagDTO.getTitle().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.LENGTH_REQUIRED, "Sorry Tag Title is required ");
        } else  if (checktag != null) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Sorry Tag Title existed ");
        } else {
            tag.setTitle(tagDTO.getTitle());
            boolean flag = tagDTO.isActive();
            if (!flag) {
                tag.setActive(false);
            } else {
                tag.setActive(true);
            }
            tagRepository.save(tag);
>>>>>>> 3406f8c119691ba2baabbc8e48d0a6f2ab2a9254
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
    public Page<Tag> findAll() {
        Pageable sort =
                PageRequest.of(0, 20, Sort.by("id").ascending().and(Sort.by("title")));
       Page<Tag> list = tagRepository.findAll(sort);
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
