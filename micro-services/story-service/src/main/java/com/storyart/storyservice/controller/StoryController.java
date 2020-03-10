package com.storyart.storyservice.controller;

import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.service.HistoryService;
import com.storyart.storyservice.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
