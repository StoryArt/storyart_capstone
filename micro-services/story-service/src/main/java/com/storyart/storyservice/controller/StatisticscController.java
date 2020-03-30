package com.storyart.storyservice.controller;

import com.netflix.discovery.converters.Auto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.repository.UserRepository;
import com.storyart.storyservice.security.CurrentUser;
import com.storyart.storyservice.security.UserPrincipal;
import com.storyart.storyservice.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/statistics")
@CrossOrigin
public class StatisticscController {

    @Autowired
    StoryService storyService;

    @GetMapping("get_read_statistics_of_user")
    public ResponseEntity getReadStatisticsOfUser(@RequestParam Date from,
                                                  @RequestParam Date to,
                                                  @CurrentUser UserPrincipal user){
        ResultDto result = storyService.getReadStatisticsByDateRangeOfUser(from, to, user.getId());
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
