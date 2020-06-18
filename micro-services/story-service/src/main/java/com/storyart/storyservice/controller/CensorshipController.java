package com.storyart.storyservice.controller;

import com.storyart.storyservice.dto.*;
import com.storyart.storyservice.dto.create_story.CreateStoryDto;
import com.storyart.storyservice.model.Rating;
import com.storyart.storyservice.security.CurrentUser;
import com.storyart.storyservice.security.UserPrincipal;
import com.storyart.storyservice.service.CensorshipService;
import com.storyart.storyservice.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/censorship")
@CrossOrigin
public class CensorshipController {

    @Autowired
    StoryService storyService;

    @Autowired
    CensorshipService censorshipService;

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


    @PutMapping("")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity handleCensorship(@Valid @RequestBody AdminHandleCensorshipDto censorshipDto){
        ResultDto result = censorshipService.handleCensorship(censorshipDto);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping("")
    @Secured({"ROLE_USER"})
    public ResponseEntity requestCensorship(@Valid @RequestBody RequestCensorshipDto censorshipDto){
        ResultDto result = censorshipService.requestCensorship(censorshipDto);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("cancel-request/{storyId}")
    @Secured({"ROLE_USER"})
    public ResponseEntity cancelRequestCensorship(@PathVariable int storyId){
        ResultDto result = censorshipService.cancelRequestCensorship(storyId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

}
