package com.storyart.storyservice.controller;


import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/history")
@CrossOrigin(origins = "*")
public class HistoryController {

    @Autowired
    HistoryService historyService;


    @GetMapping("/suggestRated{id}")
    public ResponseEntity getSuggestRated(@PathVariable("id") Integer id) {
        List<Story> list = historyService.jaccardCalculate(id);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
