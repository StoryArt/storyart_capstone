package com.storyart.storyservice.service;

import com.storyart.storyservice.model.Story;

import java.util.List;

public interface RatingService {

    List<Story> getSuggestion(Integer id);
}
