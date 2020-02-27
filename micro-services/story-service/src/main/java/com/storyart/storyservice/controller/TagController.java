package com.storyart.storyservice.controller;

import com.storyart.storyservice.model.AddTagDTO;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.*;
import javax.validation.Valid;
import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tag")
public class TagController implements Serializable {

    @Autowired
    TagService tagservice;

    @GetMapping(value ="/getAll")
    public List<Tag> getAll(){
        return tagservice.findAll();
    }

   // update
    @PutMapping(value = "/update")
    public Tag update(@RequestBody @Valid Tag tag){
        return tagservice.update(tag);
    }

    // create tag
    @PostMapping
    public Tag create(@RequestBody @Valid AddTagDTO tag){

        return tagservice.create(tag);
    }

    public Response

    // not working
    @DeleteMapping(value = "/delete/{id}")
    public Tag delete(@PathVariable("id") @Valid Integer id){
        Tag tag = tagservice.findById(id);
        if(tag != null){

        } else {

        }
        return null;
    }



}
