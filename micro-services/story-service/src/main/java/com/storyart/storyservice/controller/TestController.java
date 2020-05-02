package com.storyart.storyservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    int count=0;
    @GetMapping("")
    public ResponseEntity test(){
    return new ResponseEntity(count++, HttpStatus.OK);
    }
}
