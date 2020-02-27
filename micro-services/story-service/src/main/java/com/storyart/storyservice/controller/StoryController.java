package com.storyart.storyservice.controller;

import com.storyart.storyservice.dto.AddStoryDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/story")
public class StoryController {

    @Autowired
    StoryService storyService;

    @GetMapping("search")
    public ResponseEntity searchStory(
            @RequestParam(name = "tags") Set<Integer> tags,
            @RequestParam String keyword,
            @RequestParam boolean isActive,
            @RequestParam boolean isPublished,
            @RequestParam int page,
            @RequestParam int itemsPerPage){
        if(StringUtils.isEmpty(keyword)) keyword = "";
        Page<Story> stories = storyService.searchStories(tags, keyword, isActive, isPublished, page, itemsPerPage);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("trend-suggestions")
    public ResponseEntity getTrendStories(@RequestParam int quantity){
        List<Story> stories = storyService.getTrendingStories(quantity);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("{storyId}")
    public ResponseEntity getStoryDetails(@PathVariable int storyId){
        Story story = storyService.getStoryDetails(storyId);
        return new ResponseEntity(story, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity addStory(@RequestBody AddStoryDto story){
        ResultDto result = storyService.addStory(story);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity updateStory(@RequestBody AddStoryDto story){
        ResultDto result = storyService.updateStory(story);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
