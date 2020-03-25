package com.storyart.storyservice.service;

import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.dto.story_suggestion.HistoryDTO;
import com.storyart.storyservice.model.ReadingHistory;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.repository.HistoryRepository;
import com.storyart.storyservice.repository.StoryRepository;
import com.storyart.storyservice.repository.TagRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public interface HistoryService {
    List<Integer> jaccardCalculate(Integer id);
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
        List<ReadingHistory> CurrentUserHistory = historyRepository.findHistoryById(id);
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
        for (int x = 0; x < check.size(); x++) {
            List<ReadingHistory> byId = historyRepository.findHistoryById(check.get(x));
            int o = 0;
            HistoryDTO dto = new HistoryDTO();
            dto.setUserid(byId.get(o).getUserId());

            List<Integer> list = new ArrayList<>();
            for (int i = 0; i < byId.size(); i++) {
                list.add(byId.get(i).getStoryId());
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
        List<Story> listStory = new ArrayList<>();
        MostFitHistory.removeAll(currentUserH.getListStory());

        return MostFitHistory;
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