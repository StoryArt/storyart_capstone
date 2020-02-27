package com.storyart.storyservice.controller;

import com.storyart.storyservice.dto.AddStoryDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/story")
public class StoryController {

    @Autowired
    StoryService storyService;

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
