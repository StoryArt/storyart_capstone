package com.storyart.storyservice.controller;

import com.storyart.storyservice.model.Story;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/story")
public class StoryController {
    @GetMapping("{storyId}")
    public ResponseEntity getStoryDetails(){
        return new ResponseEntity("test", HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity addStory(@RequestBody Story story){
        return new ResponseEntity("saveStory", HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity updateStory(@RequestBody Story story){
        return new ResponseEntity("updateStory", HttpStatus.OK);
    }
}
