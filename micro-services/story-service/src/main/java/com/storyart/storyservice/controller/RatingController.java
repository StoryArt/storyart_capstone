package com.storyart.storyservice.controller;


import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rating")
@CrossOrigin(origins = "*")
public class RatingController {

    @Autowired
    RatingService ratingService;


    @GetMapping("/suggestRated{id}")
    public ResponseEntity getSuggestRated(@PathVariable("id") Integer id) {
        List<Story> list = ratingService.getSuggestion(id);

        return new ResponseEntity(list, HttpStatus.OK);
    }
}
