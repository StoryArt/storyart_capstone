package com.storyart.storyservice.controller;

import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.dto.create_story.CreateStoryDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/stories")
@CrossOrigin(origins = "*")
public class StoryController {

    @Autowired
    StoryService storyService;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @GetMapping("search")
    public ResponseEntity searchStory(
            @RequestParam(name = "tags") Set<Integer> tags,
            @RequestParam String keyword,
            @RequestParam boolean isActive,
            @RequestParam boolean isPublished,
            @RequestParam int page,
            @RequestParam int itemsPerPage){
        Page<GetStoryDto> stories = storyService.searchStories(tags, keyword, isActive, isPublished, page, itemsPerPage);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("trend")
    public ResponseEntity getTrendStories(@RequestParam int quantity){
        List<GetStoryDto> stories = storyService.getTrendingStories(quantity);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @DeleteMapping("{storyId}")
    public ResponseEntity deleteStory(@PathVariable int storyId){
        ResultDto result = storyService.deleteStory(storyId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("change_published")
    public ResponseEntity changePublishedStory(
            @RequestParam int storyId,
            @RequestParam boolean turnOnPublished){
        ResultDto result = storyService.changePublishedStatus(storyId, turnOnPublished);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("get_by_author")
    public ResponseEntity getStoriesByAuthor(
            @RequestParam int userId,
            @RequestParam String keyword,
            @RequestParam boolean asc,
            @RequestParam String orderBy,
            @RequestParam int page,
            @RequestParam int itemsPerPage){
        Page<GetStoryDto> stories = storyService.getStoriesForUser(userId, keyword, orderBy, asc, page, itemsPerPage);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("getAll")
    public ResponseEntity getAllStories(@PathVariable int userId){
        List<GetStoryDto> stories = storyService.getAll();
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("{storyId}")
    public ResponseEntity getStoryDetails(@PathVariable int storyId){
        GetStoryDto story = storyService.getStoryDetails(storyId);
        return new ResponseEntity(story, HttpStatus.OK);
    }

    @GetMapping("read/{storyId}")
    public ResponseEntity getStoryToRead(@PathVariable int storyId){
        ResultDto result = storyService.getReadingStory(storyId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("get_for_admin")
    public ResponseEntity getStoriesForAdmin(
            @RequestParam String keyword,
            @RequestParam String orderBy,
            @RequestParam boolean asc,
            @RequestParam int page,
            @RequestParam int itemsPerPage){
        Page<GetStoryDto> stories = storyService.getStoriesForAdmin(keyword, orderBy, asc, page, itemsPerPage);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity addStory(@Valid @RequestBody CreateStoryDto story){
        ResultDto result = storyService.createStory(story);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity updateStory(@Valid @RequestBody CreateStoryDto story){
        ResultDto result = storyService.updateStory(story);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("update_by_admin/{storyId}/{enable}")
    public ResponseEntity disableOrEnableByAdmin(@PathVariable int storyId,
                                                 @PathVariable boolean enable){
        ResultDto result = storyService.updateByAdmin(storyId, !enable);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
