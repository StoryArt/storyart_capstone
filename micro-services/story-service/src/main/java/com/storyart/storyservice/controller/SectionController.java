package com.storyart.storyservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/section")
public class SectionController {
    @GetMapping("all/{storyId}")
    public ResponseEntity getSectionsByStoryId(@PathVariable int storyId){
        return new ResponseEntity("getSectionsByStoryId", HttpStatus.OK);
    }

    @GetMapping("next/{sectionId}")
    public ResponseEntity getSectionsByParentSectionId(@PathVariable int sectionId){
        return new ResponseEntity("getSectionsByParentSectionId", HttpStatus.OK);
    }

    @GetMapping("current/{sectionId}")
    public ResponseEntity getSectionsById(@PathVariable int sectionId){
        return new ResponseEntity("getSectionsById", HttpStatus.OK);
    }
}
