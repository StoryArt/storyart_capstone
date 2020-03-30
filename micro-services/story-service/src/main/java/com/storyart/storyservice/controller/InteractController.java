package com.storyart.storyservice.controller;

import com.storyart.storyservice.service.LinkClickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/interact")
@CrossOrigin
public class InteractController {



    @Autowired
    LinkClickService linkClickService;



    @PostMapping("/clicklink/{sid}")
    public ResponseEntity setClick(@PathVariable("sid") Integer storyId){
        linkClickService.save(storyId);
        return new ResponseEntity("Đã lưu kết quả", HttpStatus.OK);
    }










}
