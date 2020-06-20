package com.storyart.storyservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.storyart.storyservice.common.constants.CensorshipStatus;
import com.storyart.storyservice.dto.AdminHandleCensorshipDto;
import com.storyart.storyservice.dto.RequestCensorshipDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.dto.create_story.CreateStoryDto;
import com.storyart.storyservice.model.Censorship;
import com.storyart.storyservice.model.DraftStory;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.repository.CensorshipRepository;
import com.storyart.storyservice.repository.DraftStoryRepository;
import com.storyart.storyservice.repository.StoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

public interface CensorshipService {
    ResultDto requestCensorship(RequestCensorshipDto requestCensorshipDto);
    ResultDto handleCensorship(AdminHandleCensorshipDto censorship);
    List<Censorship> getStoryCensorships(int storyId);
    ResultDto cancelRequestCensorship(int storyId);
}

@Service
class CensorshipServiceImpl implements CensorshipService{

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    CensorshipRepository censorshipRepository;

    @Autowired
    DraftStoryRepository draftStoryRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    StoryService storyService;

    @Override
    public ResultDto handleCensorship(AdminHandleCensorshipDto censorship) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        Story story = storyRepository.findById(censorship.getStoryId()).orElse(null);
        if(story == null){
            result.getErrors().put("STORY_NOTFOUND", "Không tìm thấy truyện này");
        } else if(!story.isActive() || story.isDeactiveByAdmin()){
            result.getErrors().put("STORY_NOTFOUND", "Truyện này đã bị xóa hoặc bị khóa bởi admin");
        } else {
            Censorship latestCensorship = censorshipRepository.findLatestCensorshipByStory(censorship.getStoryId());
            DraftStory draftStory = draftStoryRepository.findById(story.getId()).orElse(null);

            //check if admin already censored this story
            if(!CensorshipStatus.PENDING.equals(draftStory.getCensorshipStatus())){
                result.getErrors().put("HANDLED", "Truyện này đã kiểm duyệt rồi hoặc chưa được yêu cầu kiểm duyệt");
                return result;
            }

            latestCensorship.setCensorshipStatus(censorship.getCensorshipStatus());
            latestCensorship.setAdminNote(censorship.getAdminNote());
            latestCensorship.setHandledAt(new Date());
            censorshipRepository.save(latestCensorship);
            result.setData(latestCensorship);

            //admin approved then save draftstory to story and save new draft story again!
            if(CensorshipStatus.APPROVED.equals(censorship.getCensorshipStatus())){

                CreateStoryDto createStoryDto = null;
                try {
                    createStoryDto = objectMapper.readValue(draftStory.getContent(), CreateStoryDto.class);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }

                CreateStoryDto newCreateStoryDto = storyService.saveStory(createStoryDto, story);

                try {
                    String json = objectMapper.writeValueAsString(newCreateStoryDto);
                    draftStory.setContent(json);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
                draftStory.setCensorshipStatus(CensorshipStatus.APPROVED);
                story.setCensorshipStatus(CensorshipStatus.APPROVED);
                storyRepository.save(story);
                draftStoryRepository.save(draftStory);
            } else {
                //story.setCensorshipStatus(CensorshipStatus.REJECTED);
                draftStory.setCensorshipStatus(CensorshipStatus.REJECTED);
                //storyRepository.save(story);
                draftStoryRepository.save(draftStory);
            }

            result.setSuccess(true);
        }
        return result;
    }

    @Override
    public ResultDto requestCensorship(RequestCensorshipDto requestCensorshipDto) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        Story story = storyRepository.findById(requestCensorshipDto.getStoryId()).orElse(null);
        if(story == null){
            result.getErrors().put("STORY_NOTFOUND", "Không tìm thấy truyện này");
        } else if(!story.isActive()){
            result.getErrors().put("STORY_NOTFOUND", "Truyện này đã bị xóa");
        } else if(CensorshipStatus.PENDING.equals(story.getCensorshipStatus())){
            result.getErrors().put("STORY_PENDING", "Truyện này đang chờ được admin kiểm duyệt");
        } else {
            String currentCensorshipStatus = draftStoryRepository.getCensorshipStatusOfStoryDraft(requestCensorshipDto.getStoryId());
            if(CensorshipStatus.PENDING.equals(currentCensorshipStatus)){
                result.getErrors().put("REQUESTED", "Truyện này đã yêu cầu kiểm duyệt rồi");
            } else if(CensorshipStatus.APPROVED.equals(currentCensorshipStatus) || CensorshipStatus.REJECTED.equals(currentCensorshipStatus)){
                result.getErrors().put("REQUESTED", "Truyện này đã kiểm duyệt rồi");
            }

            if(result.getErrors().size() > 0){
                return result;
            }

            Censorship censorship = modelMapper.map(requestCensorshipDto, Censorship.class);
            censorship.setCensorshipStatus(CensorshipStatus.PENDING);
            censorship = censorshipRepository.save(censorship);
            draftStoryRepository.updateCensorshipStatus(CensorshipStatus.PENDING, censorship.getStoryId());
            result.setSuccess(true);
            result.setData(censorship);
        }
        return result;
    }

    @Override
    public List<Censorship> getStoryCensorships(int storyId) {
        return censorshipRepository.findAllByStory(storyId);
    }

    @Override
    public ResultDto cancelRequestCensorship(int storyId) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        Story story = storyRepository.findById(storyId).orElse(null);
        if(story == null){
            result.getErrors().put("STORY_NOTFOUND", "Không tìm thấy truyện này");
        } else if(!story.isActive() || story.isDeactiveByAdmin()){
            result.getErrors().put("STORY_NOTFOUND", "Truyện này đã bị xóa");
        } else {
            Censorship latestCensorship = censorshipRepository.findLatestCensorshipByStory(storyId);
            if(latestCensorship == null || !CensorshipStatus.PENDING.equals(latestCensorship.getCensorshipStatus())){
                result.getErrors().put("REQUESTED", "Truyện này chưa được yêu cầu kiểm duyệt hoặc đã được kiểm duyệt rồi");
            } else {
//                List<Censorship> censorships = censorshipRepository.findAllByStory(storyId);
//                String censorshipStatus = "";
//                if(censorships.size() > 1){
//                    censorshipStatus = censorships.get(1).getCensorshipStatus();
//                } else {
//                    censorshipStatus = null;
//                }
                draftStoryRepository.updateCensorshipStatus(null, storyId);
                censorshipRepository.deleteById(latestCensorship.getId());
                result.setSuccess(true);
            }
        }
        return result;
    }
}
