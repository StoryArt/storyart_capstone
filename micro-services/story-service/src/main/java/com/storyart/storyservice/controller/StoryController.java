package com.storyart.storyservice.controller;

import com.storyart.storyservice.dto.CensorshipDto;
import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.dto.create_story.CreateStoryDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.model.Rating;
import com.storyart.storyservice.security.CurrentUser;
import com.storyart.storyservice.security.UserPrincipal;
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
@RequestMapping("/stories")
@CrossOrigin
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

    @GetMapping("public/search")
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

    @GetMapping("public/search_by_user_profile")
    public ResponseEntity searchStory(
            @RequestParam(name = "tags") Set<Integer> tags,
            @RequestParam String keyword,
            @RequestParam int userId,
            @RequestParam int page,
            @RequestParam int itemsPerPage){
        Page<GetStoryDto> stories = storyService.searchStoriesOfUserProfile(userId, tags, keyword, page, itemsPerPage);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("public/trend")
    public ResponseEntity getTrendStories(){
        List<GetStoryDto> stories = storyService.getTheMostReadingStories();
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("rate/{storyId}")
    @Secured({"ROLE_USER"})
    public ResponseEntity getRating(@CurrentUser UserPrincipal user, @PathVariable int storyId){
        Rating rating = storyService.getRatingByStoryAndUser(storyId, user.getId());
        return new ResponseEntity(rating, HttpStatus.OK);
    }


    @PutMapping("rate")
    @Secured({"ROLE_USER"})
    public ResponseEntity rateStory(@RequestParam int storyId,
                                    @RequestParam double stars,
                                    @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.rateStory(storyId, userPrincipal.getId(), stars);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @DeleteMapping("{storyId}")
    @Secured({"ROLE_USER"})
    public ResponseEntity deleteStory(@PathVariable int storyId, @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.changeStoryStatusByUser(storyId, userPrincipal.getId());
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("change_published")
    @Secured({"ROLE_USER"})
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity changePublishedStory(
            @RequestParam int storyId,
            @RequestParam boolean turnOnPublished,
            @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.changePublishedStatus(storyId, userPrincipal.getId(), turnOnPublished);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("revert/{storyId}")
    @Secured({"ROLE_USER"})
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity revertOldCensoredVersion(
            @PathVariable int storyId,
            @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.revertOldCensoredVersion(storyId, userPrincipal.getId());
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("get_by_author")
    @Secured({"ROLE_USER"})
    public ResponseEntity getStoriesByAuthor(
//            @RequestParam String keyword,
//            @RequestParam boolean asc,
//            @RequestParam String orderBy,
//            @RequestParam boolean censored,
//            @RequestParam int page,
//            @RequestParam int itemsPerPage,
            @RequestParam String censorshipStatus,
            @CurrentUser UserPrincipal userPrincipal){
//        Page<GetStoryDto> stories = storyService.getStoriesForUser(userPrincipal.getId(), keyword, censored, orderBy, asc, page, itemsPerPage);
        List<GetStoryDto> stories = storyService.getStoriesForUser(userPrincipal.getId(), censorshipStatus);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("public/{storyId}")
    public ResponseEntity getStoryDetails(@PathVariable int storyId){
        ResultDto resultDto = storyService.getStoryDetails(storyId);
        return new ResponseEntity(resultDto, HttpStatus.OK);
    }

    @GetMapping("public/read/{storyId}")
    public ResponseEntity getStoryToRead(@PathVariable int storyId){
        ResultDto result = storyService.getReadingStoryForReading(storyId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("public/censorship/{storyId}")
    public ResponseEntity getStoryToCensor(@PathVariable int storyId){
        ResultDto result = storyService.getReadingStoryForAdmin(storyId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("public/user_edit/{storyId}")
    public ResponseEntity getStoryUserToEdit(@PathVariable int storyId){
        ResultDto result = storyService.getReadingStoryForUser(storyId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("censorship")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity getStoryToRead(@RequestBody CensorshipDto censorshipDto){
        ResultDto result = storyService.saveCensorship(censorshipDto);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("get_for_admin")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity getStoriesForAdmin(
            @RequestParam String keyword,
            @RequestParam String orderBy,
            @RequestParam String censorshipStatus,
            @RequestParam boolean asc,
            @RequestParam int page,
            @RequestParam int itemsPerPage){
        Page<GetStoryDto> stories = storyService.getStoriesForAdmin(keyword, orderBy, censorshipStatus, asc, page, itemsPerPage);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @PostMapping("")
    @Secured({"ROLE_USER"})
    public ResponseEntity addStory(@Valid @RequestBody CreateStoryDto story,
                                   @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.createStory(story, userPrincipal.getId());
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("test")
    public ResponseEntity test(@CurrentUser UserPrincipal userPrincipal){
        System.out.println("test");
        return new ResponseEntity(userPrincipal, HttpStatus.OK);
    }

    @PutMapping("")
    @Secured({"ROLE_USER"})
    public ResponseEntity updateStory(@Valid @RequestBody CreateStoryDto story, @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.updateStory(story, userPrincipal.getId());
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("update_by_admin/{storyId}/{enable}")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity disableOrEnableByAdmin(@PathVariable int storyId,
                                                 @PathVariable boolean enable){
        ResultDto result = storyService.changeStoryStatusByAdmin(storyId, !enable);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
