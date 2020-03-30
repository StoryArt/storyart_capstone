package com.storyart.storyservice.service;

import com.github.javafaker.Faker;
import com.storyart.storyservice.dto.create_reading_history.ClickLinkDto;
import com.storyart.storyservice.dto.create_reading_history.ReadingHistoryDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.dto.create_reading_history.ScreenReadTimeDto;
import com.storyart.storyservice.dto.story_suggestion.HistoryDTO;
import com.storyart.storyservice.model.ClickLink;
import com.storyart.storyservice.model.ReadingHistory;
import com.storyart.storyservice.model.ScreenReadingTime;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

public interface HistoryService {
    List<Integer> jaccardCalculate(Integer id);
    void createTempHistory();
    ResultDto saveReadHistory(ReadingHistoryDto readingHistoryDto, int userId);
    ResultDto saveClickLink(ClickLinkDto clickLink);
    ResultDto saveScreenReadTime(ScreenReadTimeDto screenReadTimeDto);
}

@Service
class HistoryServiceIml implements HistoryService {

    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    TagService tagService;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    ScreenReadingTimeRepository screenReadingTimeRepository;

    @Autowired
    ClickLinkRepository clickLinkRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public ResultDto saveClickLink(ClickLinkDto clickLink) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        Story story = storyRepository.findById(clickLink.getStoryId()).orElse(null);
        if(story == null){
            result.getErrors().put("NOT_FOUND", "Truyện này không tồn tại");
        } else if(!story.isActive() ||  story.isDeactiveByAdmin()){
            result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa");
        } else {
            ClickLink saved = modelMapper.map(clickLink, ClickLink.class);
            saved = clickLinkRepository.save(saved);
            result.setSuccess(true);
            result.setData(saved);
        }
        return result;
    }

    @Override
    public ResultDto saveScreenReadTime(ScreenReadTimeDto screenReadTimeDto) {
        ResultDto result = new ResultDto();
        System.out.println(screenReadTimeDto.getDuration());
        ScreenReadingTime screenReadingTime = modelMapper.map(screenReadTimeDto, ScreenReadingTime.class);

        screenReadingTime = screenReadingTimeRepository.save(screenReadingTime);
        result.setSuccess(true);
        result.setData(screenReadingTime);
        return result;
    }

    @Override
    public   List<Integer> jaccardCalculate(Integer id) {
        List<ReadingHistory> CurrentUserHistory = historyRepository.findHistoryByIdOnly(id);
        HistoryDTO currentUserH = new HistoryDTO();
        currentUserH.setUserid(id);
        List<Integer> listCurr = new ArrayList<>();
        for (int i = 0; i < CurrentUserHistory.size(); i++) {
            listCurr.add(CurrentUserHistory.get(i).getStoryId());
        }
        currentUserH.setListStory(listCurr);

        List<HistoryDTO> listHistory = new ArrayList<>();

        List<Integer> check = historyRepository.findUserIdHistoryExceptId(id);
        // get list history except current
        List<ReadingHistory> byId = historyRepository.findHistoryById(check);

        for (Integer integer : check){
            HistoryDTO dto = new HistoryDTO();
            List<Integer> list = new ArrayList<>();
          for(int i = 0; i < byId.size(); i++){
              if(integer.equals(byId.get(i).getUserId())){
                  dto.setUserid(byId.get(integer).getUserId());
                  list.add(byId.get(i).getStoryId());
              }
          }
            dto.setListStory(list);
            listHistory.add(dto);
        }


        // count similarity
        Double MostFit = 0.0;
        Integer MostFitId = 0;
        for (int j = 0; j < listHistory.size(); j++) {
            Double jaccard = calculate(currentUserH.getListStory(), listHistory.get(j).getListStory());
            if (jaccard >= MostFit) {
                MostFit = jaccard;
                MostFitId = listHistory.get(j).getUserid();
            }

        }

        // find story current does not read
        List<Integer> MostFitHistory = historyRepository.findListHistory(MostFitId);
        MostFitHistory.removeAll(currentUserH.getListStory());

        return MostFitHistory;
    }

    @Override
    public void createTempHistory() {

        Faker faker = new Faker();
        for(int i = 0; i < 200; i++){
            ReadingHistory rh = new ReadingHistory();
            rh.setStoryId(faker.number().numberBetween(1, 300));
            historyRepository.save(rh);
        }

    }

    @Override
    public ResultDto saveReadHistory(ReadingHistoryDto readingHistoryDto, int userId) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        Story story = storyRepository.findById(readingHistoryDto.getStoryId()).orElse(null);
        if(story == null){
            result.getErrors().put("NOT_FOUND", "Truyện này không tồn tại");
        } else if(!story.isActive() ||  story.isDeactiveByAdmin()){
            result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa");
        } else {
            ReadingHistory rh = modelMapper.map(readingHistoryDto, ReadingHistory.class);
            rh.setUserId(userId);
            rh = historyRepository.save(rh);
            int id = rh.getId();



            result.setSuccess(true);
            result.setData(rh);

        }
        return result;
    }


    public Double calculate(List<Integer> curUser, List<Integer> nextUser) {
        List<Integer> intersect = new ArrayList<>();
        for (Integer i : curUser) {
            if (nextUser.contains(i)) {
                intersect.add(i);
            }
        }

        List<Integer> union = new ArrayList<>();

        union.addAll(curUser);
        union.addAll(nextUser);

        return Double.valueOf(intersect.size()) / Double.valueOf(union.size() - intersect.size());

    }
}