package com.storyart.storyservice.controller;

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

    // find all tag
    @GetMapping
    public List<Tag> findAll(){
        List<Tag> list = tagservice.findAll();
        return list;
    }

    // find tags active
    @GetMapping(value ="/get-true")
    public List<Tag> findTagByTrue(){
        List<Tag> listtag =  tagservice.findTagByIs_activeIsTrue();
     if(listtag.isEmpty()){

         throw new ResponseStatusException(HttpStatus.NOT_FOUND,"no tag found");
     }
     return listtag;
    }

     // find tag inactive
    @GetMapping(value ="/get-false")
    public List<Tag> findTagByFalse(){
        List<Tag> listtag =  tagservice.findTagByIs_activeIsFalse();
        if(listtag.isEmpty()){


            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"no tag found");
        }
        return listtag;
    }
   // update
    @PutMapping(value = "/update/{id}")
    public Tag update(@PathVariable("id") Integer id, @RequestBody @Valid Tag tag){
        Timestamp time = new Timestamp(System.currentTimeMillis());
        tag.setCreatedAt(time);
        tag.setUpdatedAt(time);
        tag.setIs_active(true);
        tagservice.update(tag);
        return tagservice.findById(id);
    }

    // create tag
    @PostMapping
    public Tag create(@RequestBody @Valid  Tag tag){
        Timestamp time = new Timestamp(System.currentTimeMillis());
        tag.setCreatedAt(time);
        tag.setUpdatedAt(time);
        tagservice.create(tag);
        return tag;
    }

    // not working
    @PutMapping(value = "/delete/{id}")
    public List<Tag> delete(@PathVariable("id") @Valid Integer id){
        tagservice.disableTagById(id);
        List<Tag> list = tagservice.findAll();
        return list;
    }

    // not working
    @PutMapping(value = "/set-active/{id}")
    public List<Tag> setactive(@PathVariable("id") @Valid Integer id){
        tagservice.activeTagById(id);
        List<Tag> list = tagservice.findAll();
        return list;
    }


    // find tag = id
    @GetMapping(value ="/{id}")
    public Tag get(@PathVariable("id")Integer id){
        return tagservice.findById(id);
    }

    // not working
    @GetMapping(value ="/{title}")
    public List<Tag> findTagByTitle(@PathVariable("title")String title){
        return tagservice.findTagLIKETitle(title);
    }

    @PutMapping(value = "/delete/isinactive-{id}")
    public Tag deleteTag(@PathVariable("id") Integer id, @RequestBody @Valid Tag tag){
        Timestamp time = new Timestamp(System.currentTimeMillis());
        tag.setCreatedAt(time);
        tag.setUpdatedAt(time);
        tag.setIs_active(false);
        tagservice.update(tag);
        return tagservice.findById(id);
    }
}
