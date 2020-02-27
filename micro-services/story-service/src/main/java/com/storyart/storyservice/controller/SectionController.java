package com.storyart.storyservice.controller;

import com.storyart.storyservice.model.Section;
import com.storyart.storyservice.service.SectionService;
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
    SectionService sectionService;

    @GetMapping("all/{storyId}")
    public ResponseEntity getSectionsByStoryId(@PathVariable int storyId){
        List<Section> sections = sectionService.getSectionsByStoryId(storyId);
        return new ResponseEntity(sections, HttpStatus.OK);
    }
}
