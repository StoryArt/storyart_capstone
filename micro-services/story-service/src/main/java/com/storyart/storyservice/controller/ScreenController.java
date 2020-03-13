package com.storyart.storyservice.controller;

import com.storyart.storyservice.model.Screen;
import com.storyart.storyservice.service.ScreenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/section")
public class SectionController {

    @Autowired
    ScreenService screenService;

    @GetMapping("all/{storyId}")
    public ResponseEntity getSectionsByStoryId(@PathVariable int storyId){
        List<Screen> sections = screenService.getScreensByStoryId(storyId);
        return new ResponseEntity(sections, HttpStatus.OK);
    }
}
