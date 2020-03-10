package com.storyart.storyservice.controller;

import com.storyart.storyservice.model.RatedStoryDTO;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.repository.RatingRepository;
import com.storyart.storyservice.service.HistoryService;
import com.storyart.storyservice.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/history")
public class HistoryController {
    @Autowired
    HistoryService historyService;


    @GetMapping("/suggestRated{id}")
    public ResponseEntity getSuggestRated(@PathVariable("id") Integer id) {
        List<Story> list = historyService.jaccardCalculate(id);

        return new ResponseEntity(list, HttpStatus.OK);
    }
}
