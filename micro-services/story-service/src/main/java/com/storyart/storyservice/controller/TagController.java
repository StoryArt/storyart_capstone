package com.storyart.storyservice.controller;

import com.storyart.storyservice.model.AddTagDTO;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tag")
@CrossOrigin(origins = "*")
public class TagController implements Serializable {

    @Autowired
    TagService tagservice;

    @GetMapping(value = "/getAll")
    public Page<Tag> getAll() {

        Page<Tag> list = tagservice.findAll();
        return list;
    }


    // create tag
    @PostMapping("")
    public ResponseEntity createTag(@RequestBody @Valid AddTagDTO tagDTO) {
        Tag tag = tagservice.create(tagDTO);

        return new ResponseEntity(tag, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity updateTag(@RequestBody @Valid AddTagDTO tagDTO) {
        Tag tag = tagservice.update(tagDTO);
        return new ResponseEntity(tag, HttpStatus.OK);
    }

    @PutMapping("/status")
    public ResponseEntity updateTagStatus(@RequestBody @Valid AddTagDTO tagDTO) {
        Tag tag = tagservice.updateStatus(tagDTO);
        return new ResponseEntity(tag, HttpStatus.OK);
    }




}
