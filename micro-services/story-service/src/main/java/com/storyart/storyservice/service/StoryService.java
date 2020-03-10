package com.storyart.storyservice.service;

import com.storyart.storyservice.dto.AddStoryDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.model.Section;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.repository.SectionRepository;
import com.storyart.storyservice.repository.StoryRepository;
import com.storyart.storyservice.repository.UserRepository;
import com.storyart.storyservice.utils.UUIDUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface StoryService {
    HashMap<String, String> validateStoryinfo(AddStoryDto story);
    Story getStoryDetails(int id);
    ResultDto addStory(AddStoryDto story);
    ResultDto updateStory(AddStoryDto story);
    Page<Story> searchStories(Set<Integer> tags, String keyword, boolean isActive,
                              boolean isPublished, int page, int itemsPerPage);
    List<Story> getTrendingStories(int quantity);
}

@Service
class StoryServiceImpl implements StoryService{
    @Autowired
    StoryRepository storyRepository;

    @Autowired
    SectionRepository sectionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper modelMapper;


    @Override
    public HashMap<String, String> validateStoryinfo(AddStoryDto storyDto) {
        HashMap<String, String> errors = new HashMap<>();

        if(storyDto.isParametered()){
            if(StringUtils.isEmpty(storyDto.getParameterName())) {
                errors.put("title", "Story Parameter is required");
            }
            if(storyDto.getTotalParameterPoints() <= 0){
                errors.put("parameterPoint", "Story's parameter point must be over 0");
            }
            if(storyDto.getMinParameterPoints() <= 0){
                errors.put("minParameterPoint", "Story's min parameter point must at least 0");
            }
        }

        if(errors.size() > 0) return errors;

        if(storyDto.getSections().size() != 0) {
            HashMap<String, String> keysMap = new HashMap<>();
            //

            //check num of root node
            for(int i = 0; i < storyDto.getSections().size(); i++){
                Section section = storyDto.getSections().get(i);

                if(StringUtils.isEmpty(section.getTitle())){
                    errors.put("sectionTitle", "Section Title is required!");
                }

                if(StringUtils.isEmpty(section.getContent())){
                    errors.put("sectionContent", "Section content is required!");
                }

                if(errors.size() > 0) return errors;

                if(section.getId().equals(section.getParentSectionId())){
                    errors.put("sectionId", "Section id must not be the same with parent id");
                    return errors;
                }
                if(i != 0 && section.getParentSectionId() == null) {
                    errors.put("sectionId", "Story must contain only 1 section root");
                    return errors;
                }

                keysMap.put(section.getId(), UUIDUtils.generateUniqueId());
            }

            //check valid unique id
            if(keysMap.size() != storyDto.getSections().size()){
                errors.put("duplicate_id", "Sections must have unique key!");
            } else {
                //check valid parent section id
                for(int i = 0; i < storyDto.getSections().size(); i++){
                    Section section = storyDto.getSections().get(i);
                    if(section.getParentSectionId() != null){
                        String uuid = keysMap.get(section.getParentSectionId());
                        if(uuid == null){
                            errors.put("parent_null", "Parent Section with id " + section.getParentSectionId() + " does not exist");
                            return errors;
                        }
                    }
                }
            }
        }

        return errors;
    }

    @Override
    public Story getStoryDetails(int id) {
        Optional<Story> story = storyRepository.findById(id);
        if(story.isPresent()) return story.get();
        return null;
    }

    @Override
    public ResultDto addStory(AddStoryDto storyDto) {
        ResultDto resultDto = new ResultDto();
        HashMap<String, String> errors = validateStoryinfo(storyDto);
        resultDto.setErrors(errors);

        if(errors.size() == 0){ //valid
            Story story = modelMapper.map(storyDto, Story.class);
            story.setActive(true);
            story.setAvgRate(0);
            Story newStory = storyRepository.save(story);

            if(storyDto.isParametered()){
                for(int i = 0; i < storyDto.getSections().size(); i++){
                    Section section = storyDto.getSections().get(i);
                    section.setStoryId(newStory.getId());
                    section.setId(UUIDUtils.generateUniqueId());

                    if(i == 0) section.setParentSectionId(null);
                    else section.setParentSectionId(storyDto.getSections().get(i - 1).getId());

                    sectionRepository.save(section);
                }
            } else {
                HashMap<String, String> keysMap = new HashMap<>();
                storyDto.getSections().stream().forEach(section -> {
                    keysMap.put(section.getId(), UUIDUtils.generateUniqueId());
                });

                for(int i = 0; i < storyDto.getSections().size(); i++){
                    Section section = storyDto.getSections().get(i);
                    section.setStoryId(newStory.getId());
                    section.setId(keysMap.get(section.getId()));

                    if(section.getParentSectionId() != null){
                        String parentId = keysMap.get(section.getParentSectionId());
                        section.setParentSectionId(parentId);
                    }

                    sectionRepository.save(section);
                }
            }
            resultDto.setSuccess(true);
        } else { //invalid
            resultDto.setSuccess(false);
        }

        return resultDto;
    }

    @Override
    public ResultDto updateStory(AddStoryDto storyDto) {
        ResultDto resultDto = new ResultDto();
        HashMap<String, String> errors = validateStoryinfo(storyDto);
        resultDto.setErrors(errors);

        if(errors.size() == 0){ //valid
            Story story = modelMapper.map(storyDto, Story.class);
            Story newStory = storyRepository.save(story);

            if(storyDto.isParametered()){
                for(int i = 0; i < storyDto.getSections().size(); i++){
                    Section section = storyDto.getSections().get(i);
                    section.setStoryId(newStory.getId());

                    if(i == 0) section.setParentSectionId(null);
                    else section.setParentSectionId(storyDto.getSections().get(i - 1).getId());

                    sectionRepository.save(section);
                }
            } else {
                HashMap<String, String> keysMap = new HashMap<>();
                storyDto.getSections().stream().forEach(section -> {
                    keysMap.put(section.getId(), UUIDUtils.generateUniqueId());
                });

                for(int i = 0; i < storyDto.getSections().size(); i++){
                    Section section = storyDto.getSections().get(i);
                    section.setStoryId(newStory.getId());
                    section.setId(keysMap.get(section.getId()));

                    if(section.getParentSectionId() != null){
                        String parentId = keysMap.get(section.getParentSectionId());
                        section.setParentSectionId(parentId);
                    }

                    sectionRepository.save(section);
                }
            }
            resultDto.setSuccess(true);
        } else { //invalid
            resultDto.setSuccess(false);
        }

        return resultDto;
    }

    @Override
    public Page<Story> searchStories(Set<Integer> tags, String keyword, boolean isActive,
                                     boolean isPublished, int page, int itemsPerPage) {
        Pageable pageable =  PageRequest.of(page - 1, itemsPerPage, Sort.by("id").ascending());
        Page<Story> page1 = storyRepository.findAllBySearchCondition(keyword, tags, isActive, isPublished, pageable);
        return page1;
    }

    @Override
    public List<Story> getTrendingStories(int quantity) {
        Pageable pageable =  PageRequest.of(0, quantity, Sort.by("avgRate").descending());
        return storyRepository.findAll(pageable).getContent();
    }
}
