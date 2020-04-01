package com.storyart.storyservice.service;

import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.dto.story_suggestion.RatedStoryDTO;
import com.storyart.storyservice.dto.story_suggestion.RatingDTO;
import com.storyart.storyservice.dto.story_suggestion.StoryCommentDTO;
import com.storyart.storyservice.model.Rating;
import com.storyart.storyservice.model.Screen;
import com.storyart.storyservice.model.ids.RatingId;
import com.storyart.storyservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface ScreenService {
   List<Screen> getScreensByStoryId(int storyId);
}


@Service
class ScreenServiceImpl implements ScreenService {

    @Autowired
    ScreenRepository screenRepository;

    @Override
    public List<Screen> getScreensByStoryId(int storyId) {
        return screenRepository.findByStoryId(storyId);
    }
}
