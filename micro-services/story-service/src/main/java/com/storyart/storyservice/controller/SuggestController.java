package com.storyart.storyservice.controller;

import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.repository.StoryRepository;
import com.storyart.storyservice.repository.TagRepository;
import com.storyart.storyservice.service.HistoryService;
import com.storyart.storyservice.service.RatingService;
import com.storyart.storyservice.service.StoryService;
import com.storyart.storyservice.service.TagService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.function.Function;

@RestController
@RequestMapping("/suggestion")
@CrossOrigin(origins = "*")
public class SuggestController {

    @Autowired
    HistoryService historyService;

    @Autowired
    RatingService ratingService;

    @Autowired
    StoryRepository storyRepository;


    @Autowired
    TagRepository tagRepository;

    @Autowired
    TagService tagService;



        @GetMapping("/suggest{id}")
        public ResponseEntity getSuggestion(@PathVariable("id") Integer id,
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize)
        {
        pageNo = pageNo -1;
        if(pageNo<0){
            pageNo = 0;
        }


        List<Integer> listhistory = historyService.jaccardCalculate(id);
        List<Integer> listRatingthisWeek = ratingService.getSuggestion(id,true);
        List<Integer> listRatingExceptThisWeek = ratingService.getSuggestion(id,false);
        List<Integer> listStoryPoint = ratingService.getSuggestByCommentAndReaction();
        List<Integer> total = new ArrayList<>();



        if(listhistory.size() >=4){
            List<Integer> listhistoryRandom = getRandomElement(listhistory, 5);
            total.addAll(listhistoryRandom);

        }else{
            for (int i =0; i < listhistory.size(); i++){
                total.add(listhistory.get(i));
            }
        }

        if(listRatingthisWeek.size() >=4){
            List<Integer> listRatingthisWeekR = getRandomElement(listRatingthisWeek, 5);
            total.addAll(listRatingthisWeekR);

        }else{
            for (int i =0; i < listRatingthisWeek.size(); i++){
                total.add(listRatingthisWeek.get(i));
            }
        }


        if(listRatingExceptThisWeek.size() >=4){
            List<Integer> listRatingExceptThisWeekR = getRandomElement(listRatingExceptThisWeek, 5);
            total.addAll(listRatingExceptThisWeekR);

        }else{
            for (int i =0; i < listRatingExceptThisWeek.size(); i++){
                total.add(listRatingExceptThisWeek.get(i));
            }
        }

        if(listStoryPoint.size() >=2){
            List<Integer> listStoryPointR = getRandomElement(listStoryPoint, 3);
            total.addAll(listStoryPointR);

        }else{
            for (int i =0; i < listStoryPoint.size(); i++){
                total.add(listStoryPoint.get(i));
            }
        }

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Story> storyPage = storyRepository.findAllByStoryIds(total, pageable);

        ModelMapper mm = new ModelMapper();
        Page<GetStoryDto> responsePage = storyPage.map(new Function<Story, GetStoryDto>() {
            @Override
            public GetStoryDto apply(Story story) {
                List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
                GetStoryDto dto = mm.map(story, GetStoryDto.class);
                dto.setTags(tagService.mapModelToDto(tagList));
                return dto;
            }
        });

        return new ResponseEntity(responsePage, HttpStatus.OK);
    }

    @GetMapping("/suggeststory")
    public ResponseEntity getSuggestionStory(
                                        @RequestParam(defaultValue = "1") Integer pageNo,
                                        @RequestParam(defaultValue = "10") Integer pageSize)
    {

        pageNo = pageNo -1;
        if(pageNo<0){
            pageNo = 0;
        }
        List<Integer> listStoryPoint = ratingService.getSuggestByCommentAndReaction();

        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Story> storyPage = storyRepository.findAllByStoryIds(listStoryPoint, pageable);

        ModelMapper mm = new ModelMapper();
        Page<GetStoryDto> responsePage = storyPage.map(new Function<Story, GetStoryDto>() {
            @Override
            public GetStoryDto apply(Story story) {
                List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
                GetStoryDto dto = mm.map(story, GetStoryDto.class);
                dto.setTags(tagService.mapModelToDto(tagList));
                return dto;
            }
        });

        return new ResponseEntity(responsePage, HttpStatus.OK);
    }
    public List<Integer> getRandomElement(List<Integer> list,
                                          int totalItems)
    {
        Random rand = new Random();
        List<Integer> newList = new ArrayList<>();
        for (int i = 0; i < totalItems; i++) {
            int randomIndex = rand.nextInt(list.size());
            newList.add(list.get(randomIndex));
        }
        return newList;
    }
}
