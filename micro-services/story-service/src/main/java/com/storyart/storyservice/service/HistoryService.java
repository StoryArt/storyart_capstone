package com.storyart.storyservice.service;

import com.storyart.storyservice.model.RatedStoryDTO;
import com.storyart.storyservice.model.Story;

import java.util.List;

public interface HistoryService {


    List<Story> jaccardCalculate(Integer id);
}
