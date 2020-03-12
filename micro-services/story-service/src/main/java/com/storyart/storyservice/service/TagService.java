package com.storyart.storyservice.service;


import com.storyart.storyservice.dto.TagDto;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.repository.TagRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

public interface TagService {
    List<TagDto> getTags();
    List<TagDto> mapModelToDto(List<Tag> tags);
}

@Service
class TagServiceImpl implements TagService{
    @Autowired
    TagRepository tagRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<TagDto> getTags() {
        List<Tag> tags = tagRepository.findAll();
        return tags.stream().map(tag -> {
            TagDto t = modelMapper.map(tag, TagDto.class);
            return t;
        }).collect(Collectors.toList());
    }

    @Override
    public List<TagDto> mapModelToDto(List<Tag> tags) {
        return tags.stream().map(t -> modelMapper.map(t, TagDto.class)).collect(Collectors.toList());
    }
}
