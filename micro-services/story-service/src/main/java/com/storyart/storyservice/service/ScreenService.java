package com.storyart.storyservice.service;

import com.storyart.storyservice.model.Section;
import com.storyart.storyservice.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface SectionService {
    List<Section> getSectionsByStoryId(int storyId);
}

@Service
class SectionServiceImpl implements SectionService{

    @Autowired
    SectionRepository sectionRepository;

    @Override
    public List<Section> getSectionsByStoryId(int storyId) {
        return sectionRepository.findByStoryId(storyId);
    }
}
