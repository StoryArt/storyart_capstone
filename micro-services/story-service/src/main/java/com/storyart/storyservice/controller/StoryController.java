package com.storyart.storyservice.controller;

import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.dto.create_story.CreateStoryDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.dto.statistic.*;
import com.storyart.storyservice.model.Rating;
import com.storyart.storyservice.security.CurrentUser;
import com.storyart.storyservice.security.UserPrincipal;
import com.storyart.storyservice.service.ScreenReadingTimeService;
import com.storyart.storyservice.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public ResponseEntity getTrendStories(@RequestParam int quantity){
        List<GetStoryDto> stories = storyService.getTrendingStories(quantity);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("rate/{storyId}")
    public ResponseEntity getRating(@CurrentUser UserPrincipal user, @PathVariable int storyId){
        Rating rating = storyService.getRatingByStoryAndUser(storyId, user.getId());
        return new ResponseEntity(rating, HttpStatus.OK);
    }

    @PutMapping("public/increase-read")
    public ResponseEntity increaseStoryRead(@RequestParam int storyId){
        ResultDto result = storyService.increaseStoryRead(storyId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("rate")
    public ResponseEntity rateStory(@RequestParam int storyId,
                                    @RequestParam double stars,
                                    @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.rateStory(storyId, userPrincipal.getId(), stars);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping("read_history")
    public ResponseEntity saveReadHistory(@RequestParam int storyId, @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.saveReadHistory(storyId, userPrincipal.getId());
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @DeleteMapping("{storyId}")
    public ResponseEntity deleteStory(@PathVariable int storyId, @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.deleteStory(storyId, userPrincipal.getId());
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("change_published")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity changePublishedStory(
            @RequestParam int storyId,
            @RequestParam boolean turnOnPublished,
            @CurrentUser UserPrincipal userPrincipal){
        System.out.println("change_publsihed");
        ResultDto result = storyService.changePublishedStatus(storyId, userPrincipal.getId(), turnOnPublished);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("get_by_author")//cai nay van chay dc ne, ko bi sao
    public ResponseEntity getStoriesByAuthor(
            @RequestParam String keyword,
            @RequestParam boolean asc,
            @RequestParam String orderBy,
            @RequestParam int page,
            @RequestParam int itemsPerPage,
            @CurrentUser UserPrincipal userPrincipal){
        Page<GetStoryDto> stories = storyService.getStoriesForUser(userPrincipal.getId(), keyword, orderBy, asc, page, itemsPerPage);
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("public/getAll")
    public ResponseEntity getAllStories(@PathVariable int userId){
        List<GetStoryDto> stories = storyService.getAll();
        return new ResponseEntity(stories, HttpStatus.OK);
    }

    @GetMapping("public/{storyId}")
    public ResponseEntity getStoryDetails(@PathVariable int storyId){
        GetStoryDto story = storyService.getStoryDetails(storyId);
        return new ResponseEntity(story, HttpStatus.OK);
    }

    @GetMapping("public/read/{storyId}")
    public ResponseEntity getStoryToRead(@PathVariable int storyId){
        System.out.println("story: " + storyId);
        ResultDto result = storyService.getReadingStory(storyId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("get_for_admin")
    @Secured({"ROLE_ADMIN"})
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
    public ResponseEntity updateStory(@Valid @RequestBody CreateStoryDto story, @CurrentUser UserPrincipal userPrincipal){
        ResultDto result = storyService.updateStory(story, userPrincipal.getId());
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PutMapping("update_by_admin/{storyId}/{enable}")
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity disableOrEnableByAdmin(@PathVariable int storyId,
                                                 @PathVariable boolean enable){
        ResultDto result = storyService.updateByAdmin(storyId, !enable);
        return new ResponseEntity(result, HttpStatus.OK);
    }


    //số liệu từ khi xuất bản câu truyện lần đầu (cũng bao gồm 1 số thông tin khác)
    @GetMapping("story/{sid}/summary")
    public ResponseEntity getStorySummary(@PathVariable int sid){
        StorySummarizeResponse storySummarizeResponse= storyService.getStorySummarizeResponse(sid);
        return new ResponseEntity(storySummarizeResponse, HttpStatus.OK);
    }


    @Autowired
    ScreenReadingTimeService screenReadingTimeService;
    // tam thoi de null
    @GetMapping("story/{sid}/statistic/screen")
    public ResponseEntity getStoryScreenStatistic(@PathVariable int sid,@RequestBody TimeRangeRequest timeRangeRequest){
        List<ScreenTimeResponse> storySummarizeResponse= screenReadingTimeService.getListDurationOfEachSreenInTimeRangeByStoryId(sid, timeRangeRequest.getStart(), timeRangeRequest.getEnd());

        return new ResponseEntity(storySummarizeResponse, HttpStatus.OK);
    }


    // bao gồm số liệu cho biểu đồ đường của rating theo khung thời gian
    @GetMapping("story/{sid}/statistic/rating")
    public ResponseEntity getRating_Statistic(@PathVariable int sid){
        List<IRatingClassify> ratingClassifyList= storyService.getRatingClassify(sid);
        return new ResponseEntity(ratingClassifyList, HttpStatus.OK);
    }

    // bao gồm số liệu cho biểu đồ đường của (share, comment(cái
    // này gọi qua gw sang comment sv của a đạt))
    @PostMapping("story/{sid}/statistic/react")
    public ResponseEntity getReacts_Statistic(@PathVariable int sid, @RequestBody TimeRangeRequest timeRangeRequest){
        StoryReactByRange storyReactByRanges= storyService.getReactStatisticInTimeRange(sid,timeRangeRequest );
        return new ResponseEntity(storyReactByRanges, HttpStatus.OK);
    }
}
