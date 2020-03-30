package com.storyart.storyservice.service;

import com.github.javafaker.Faker;
import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.dto.story_suggestion.HistoryDTO;
import com.storyart.storyservice.model.ReadingHistory;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.model.interactModel.ClickLink;
import com.storyart.storyservice.repository.HistoryRepository;
import com.storyart.storyservice.repository.StoryRepository;
import com.storyart.storyservice.repository.TagRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.function.Function;

public interface HistoryService {
    List<Integer> jaccardCalculate(Integer id);
    void createTempHistory();

    List<Integer> findHitpointListByRange(Integer sid, String start, String end);
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

    @Override
    public List<Integer> findHitpointListByRange(Integer sid,String start, String  end) {

        Date startDate, endDate;
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));

        Calendar calendarEnd = Calendar.getInstance();
        Calendar calendarStart = Calendar.getInstance();

        try {
            startDate = formatter.parse(start);
            calendarStart.setTime(startDate);
            endDate = formatter.parse(end);
            calendarEnd.setTime(endDate);
            calendarEnd.set(Calendar.HOUR, 23);
            calendarEnd.set(Calendar.MINUTE, 59);
            calendarEnd.set(Calendar.SECOND, 59);
            endDate = calendarEnd.getTime();
        } catch (ParseException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sai định dạng ngày.");
        }
        List<ReadingHistory> hitPoints = historyRepository
                .findAllByStoryIdAndIsReachingEndAndCreatedAtBetweenOrderByCreatedAtDesc(sid,true,  startDate, endDate);
        List<Integer> integerList = new ArrayList<>();
        int totalDay = (int) ChronoUnit.DAYS.between(calendarStart.toInstant(), calendarEnd.toInstant());
        for (int i = 0; i <= totalDay; i++) {
            Date dateTemp = calendarStart.getTime();
            int countClickByDay = 0;
            for (ReadingHistory hitPoint : hitPoints) {
                //getDate of hit point
                Date date = new Date(hitPoint.getCreatedAt().getTime());
                String dateString = formatter.format(date);
                //23/02/2020
                try {
                    date = formatter.parse(dateString);
                } catch (ParseException e) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Có lỗi xảy ra khi tính toán.");
                }
//                so sanh ngay cua 2 list rong va co
                if (date.compareTo(dateTemp) == 0) {
                    countClickByDay++;
                }
            }
            integerList.add(countClickByDay);
            calendarStart.add(Calendar.DAY_OF_MONTH, 1);
        }
        return integerList;
    }

}