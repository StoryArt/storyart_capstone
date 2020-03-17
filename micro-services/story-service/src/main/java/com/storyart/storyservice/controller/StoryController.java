package com.storyart.storyservice.controller;

import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.dto.create_story.CreateStoryDto;
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
@RequestMapping("/stories")
@CrossOrigin(origins = "*")
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
        Page<GetStoryDto> stories = storyService.searchStories(tags, keyword, isActive, isPublished, page, itemsPerPage);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("trend")
    public ResponseEntity getTrendStories(@RequestParam int quantity){
        List<GetStoryDto> stories = storyService.getTrendingStories(quantity);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("get_by_author/{userId}")
    public ResponseEntity getStoriesByAuthor(@PathVariable int userId){
        List<GetStoryDto> stories = storyService.getStoriesByUserId(userId);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("{storyId}")
    public ResponseEntity getStoryDetails(@PathVariable int storyId){
        GetStoryDto story = storyService.getStoryDetails(storyId);
        return new ResponseEntity(story, HttpStatus.OK);
    }

    @GetMapping("read/{storyId}")
    public ResponseEntity getStoryToRead(@PathVariable int storyId){
        ResultDto result = storyService.getReadingStory(storyId);
        return new ResponseEntity(result, HttpStatus.OK);
    }


    @PostMapping("")
    public ResponseEntity addStory(@RequestBody CreateStoryDto story){
        ResultDto result = storyService.createStory(story);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity updateStory(@RequestBody CreateStoryDto story){
        ResultDto result = storyService.updateStory(story);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
