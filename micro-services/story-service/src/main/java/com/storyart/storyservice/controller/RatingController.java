package com.storyart.storyservice.controller;


import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity getSuggestRated(@PathVariable("id") Integer id,
                                          @RequestParam(defaultValue = "1") Integer pageNo,
                                          @RequestParam(defaultValue = "10") Integer pageSize

    ) {

        pageNo = pageNo -1;
        if(pageNo<0){
            pageNo = 0;
        }
        Page<GetStoryDto> list = ratingService.getSuggestion(id,pageNo, pageSize);

     return  new ResponseEntity(list, HttpStatus.OK);
    }
}
