package com.storyart.storyservice.service;

import com.storyart.storyservice.model.*;
import com.storyart.storyservice.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface
ScreenService {
    List<Screen> getScreensByStoryId(int storyId);
}

@Service
class ScreenServiceImpl implements ScreenService {

    @Autowired
    ScreenRepository screenRepository;

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    ActionRepository actionRepository;

    @Autowired
    InformationRepository informationRepository;

    @Autowired
    InfoConditionRepository infoConditionRepository;

    @Autowired
    InformationActionRepository informationActionRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<Screen> getScreensByStoryId(int storyId) {
        return screenRepository.findByStoryId(storyId);
    }


}
