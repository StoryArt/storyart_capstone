package com.storyart.storyservice.controller;

import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.repository.*;
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
import java.util.Optional;
import java.util.Random;
import java.util.function.Function;

@RestController
@RequestMapping("/suggestion")
@CrossOrigin(origins = "*")
public class SuggestController {

    @Autowired
    HistoryService historyService;

    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    RatingService ratingService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    StoryService storyService;

    @Autowired
    RatingRepository ratingRepository;


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
            Pageable pageable = PageRequest.of(pageNo, pageSize);
            List<Integer> total = new ArrayList<>();
            List<Integer> liststoryInteger = ratingService.listAvgRate();
    Optional<Integer> check = ratingRepository.checkRatingById(id);
    if(check.isPresent()){
        //     List<Integer> listhistory = historyService.jaccardCalculate(id);
        //  List<Integer> listStoryPoint = ratingService.getSuggestByCommentAndReaction();

    //    List<Integer> listRatingthisWeek = ratingService.getSuggestion(id,true);
        List<Integer> listRatingExceptThisWeek = ratingService.getSuggestion(id,false);

    try{
        if(listRatingExceptThisWeek.size() == 0){
            if(liststoryInteger.size() >= 4){
                List<Integer> AfterRandom = getRandomElement(liststoryInteger, 4);
                total.addAll(AfterRandom);
            }else{
                total.addAll(liststoryInteger);
            }
        }else{
            if(listRatingExceptThisWeek.size() >=4){
                List<Integer> listRatingExceptThisWeekR = getRandomElement(listRatingExceptThisWeek, 4);
                total.addAll(listRatingExceptThisWeekR);

            }else{
                for (int i =0; i < listRatingExceptThisWeek.size(); i++){
                    total.add(listRatingExceptThisWeek.get(i));
                }
            }
        }

   /* if(listRatingthisWeek.size() >=4){
        List<Integer> listlistRatingthisWeek = getRandomElement(listRatingthisWeek, 4);
        total.addAll(listlistRatingthisWeek);

    }else{
        for (int i =0; i < listRatingthisWeek.size(); i++){
            total.add(listRatingthisWeek.get(i));
        }
    }*/
    }catch (Exception ex){

        if(liststoryInteger.size() >= 4){
            List<Integer> AfterRandom = getRandomElement(liststoryInteger, 4);
            total.addAll(AfterRandom);
        }else{
            total.addAll(liststoryInteger);
        }
    }
     }else{
        if(liststoryInteger.size() >= 4){
            List<Integer> AfterRandom = getRandomElement(liststoryInteger, 4);
            total.addAll(AfterRandom);
        }else{
            total.addAll(liststoryInteger);
        }
    }
    List<Integer> listStoryAuthor = storyRepository.getAllStoryIdByUserId(id);
    if(listStoryAuthor.size() >0){
        total.removeAll(listStoryAuthor);
    }
    if(total.size() == 0){
        List<Integer> AfterRandom = getRandomElement(liststoryInteger, 4);
        total.addAll(AfterRandom);
    }

            Page<Story> storyPage = storyRepository.findAllByStoryIds(total, pageable);
            ModelMapper mm = new ModelMapper();
            Page<GetStoryDto> responsePage = storyPage.map(new Function<Story, GetStoryDto>() {
                @Override
                public GetStoryDto apply(Story story) {
                    List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
                    GetStoryDto dto = mm.map(story, GetStoryDto.class);
                    dto.setTags(tagService.mapModelToDto(tagList));
                    dto.setUser(userRepository.findById(story.getUserId()).orElse(null));
                    dto.setNumOfRead(historyRepository.countAllByStoryId(dto.getId()));
                    return dto;
                }
            });

            return new ResponseEntity(responsePage, HttpStatus.OK);
    }

    @GetMapping("/suggeststory{id}")
    public ResponseEntity getSuggestionStory(@PathVariable("id") Integer id,
                                        @RequestParam(defaultValue = "1") Integer pageNo,
                                        @RequestParam(defaultValue = "10") Integer pageSize)
    {

        pageNo = pageNo -1;
        if(pageNo<0){
            pageNo = 0;
        }
        List<Integer> total = new ArrayList<>();
        List<Integer> liststoryInteger = ratingService.listAvgRate();
        if(liststoryInteger.size() >= 4){
            List<Integer> AfterRandom = getRandomElement(liststoryInteger, 4);
            total.addAll(AfterRandom);
        }else{
            total.addAll(liststoryInteger);
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
                dto.setUser(userRepository.findById(story.getUserId()).orElse(null));
                dto.setNumOfRead(historyRepository.countAllByStoryId(dto.getId()));
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
