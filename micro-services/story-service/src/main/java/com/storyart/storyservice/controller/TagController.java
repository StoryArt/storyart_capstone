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

<<<<<<< HEAD
    @GetMapping(value ="/getAll")
    public List<Tag> getAll(){
        return tagservice.findAll();
=======
    @GetMapping(value = "/getAll")
    public Page<Tag> getAll() {

        Page<Tag> list = tagservice.findAll();
        return list;
>>>>>>> 3406f8c119691ba2baabbc8e48d0a6f2ab2a9254
    }


    // create tag
    @PostMapping("")
    public ResponseEntity createTag(@RequestBody @Valid AddTagDTO tag){
        tagservice.create(tag);

        return ResponseEntity.ok("create Success");
    }
   // @GetMapping(value = "/isActive")
   /* public List<Tag> findTagsByStatus(@RequestParam(value = "status", defaultValue="false")  boolean status){
        List<Tag> list = tagservice.findTagsByActive(status);
        return list;
    }*/

    // update

    @PutMapping("")
    public ResponseEntity updateTag(@RequestBody @Valid AddTagDTO tag){
        tagservice.update(tag);
        return ResponseEntity.ok("update Success");
    }


    @DeleteMapping(value = "/{id}")
    public ResponseEntity delete(@PathVariable("id") Integer id, @RequestParam(value = "isActive" ) boolean isActive){
        Tag tag = tagservice.findById(id);
        if(tag != null){
            tag.setActive(isActive);
            tagservice.updateStatus(tag);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sorry, Tag do not exist ");
        }
        if(isActive){
            return ResponseEntity.ok("active Status Success");
        }
        return ResponseEntity.ok("inactive Status Success");
    }

<<<<<<< HEAD
  /*  @PutMapping(value = "/active/{id}")
    public ResponseEntity activeTag(@PathVariable("id") @Valid Integer id){
        Tag tag = tagservice.findById(id);
        if(tag != null){
            tagservice.updateStatus(tag);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sorry, Tag do not exist ");
        }
        return ResponseEntity.ok("delete Success");
    }*/
=======
    @PutMapping("/status")
    public ResponseEntity updateTagStatus(@RequestBody @Valid AddTagDTO tagDTO) {
        Tag tag = tagservice.updateStatus(tagDTO);
        return new ResponseEntity(tag, HttpStatus.OK);
    }

>>>>>>> 3406f8c119691ba2baabbc8e48d0a6f2ab2a9254



}
