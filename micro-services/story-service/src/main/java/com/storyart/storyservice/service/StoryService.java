package com.storyart.storyservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.discovery.converters.Auto;
import com.storyart.storyservice.common.constants.*;
import com.storyart.storyservice.dto.CensorshipDto;
import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.dto.create_reading_history.ReadingHistoryDto;
import com.storyart.storyservice.dto.create_story.*;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.dto.read_story.ReadStoryDto;
import com.storyart.storyservice.dto.read_story.ReadStoryInformationDto;
import com.storyart.storyservice.dto.read_story.ReadStoryScreenDto;
import com.storyart.storyservice.dto.read_story.ReadStoryTagDto;
import com.storyart.storyservice.dto.statistic.*;
import com.storyart.storyservice.dto.statistics.ReadStatisticDto;
import com.storyart.storyservice.model.*;
import com.storyart.storyservice.repository.*;
import com.storyart.storyservice.utils.MyStringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public interface StoryService {
    HashMap<String, String> validateStoryinfo(CreateStoryDto story);

    ResultDto getStoryDetails(int id);

    ResultDto getReadingStoryForAdmin(int storyId);

    ResultDto getReadingStoryForUser(int storyId);

    ResultDto getReadingStoryForReading(int storyId);

    ResultDto createStory(CreateStoryDto story, int userId);

    ResultDto updateStory(CreateStoryDto story, int userId);

    Page<GetStoryDto> searchStories(Set<Integer> tags, String keyword, boolean isActive,
                                    boolean isPublished, int page, int itemsPerPage);

    Page<GetStoryDto> searchStoriesOfUserProfile(int userid, Set<Integer> tags, String keyword, int page, int itemsPerPage);

    List<GetStoryDto> getTheMostReadingStories();

    Page<GetStoryDto> getStoriesForAdmin(String keyword, String orderBy, String censorshipStatus, boolean asc, int page, int itemsPerPage);

//    Page<GetStoryDto> getStoriesForUser(int userId, String keyword, boolean censored, String orderBy, boolean asc, int page, int itemsPerPage);
    List<GetStoryDto> getStoriesForUser(int userId);
    ResultDto changeStoryStatusByAdmin(int storyId, boolean disable);

    ResultDto changeStoryStatusByUser(int storyId, int userId);

    ResultDto changePublishedStatus(int storyId, int userId, boolean turnOnPublished);

    ResultDto rateStory(int storyId, int userId, double stars);

    ResultDto getReadStatisticsByDateRangeOfUser(Date from, Date to, int userId);

    Rating getRatingByStoryAndUser(int storyId, int userId);

    ResultDto saveCensorship(CensorshipDto censorshipDto);

    CreateStoryDto saveStory(CreateStoryDto storyDto, Story foundStory);

}

@Service
class StoryServiceImpl implements StoryService {
    @Autowired
    ScreenRepository screenRepository;

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    ActionRepository actionRepository;

    @Autowired
    InformationRepository informationRepository;

    @Autowired
    InfoConditionRepository infoConditionRepository;

    @Autowired
    InformationActionRepository informationActionRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    TagService tagService;

    @Autowired
    StoryTagRepository storyTagRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    CensorshipRepository censorshipRepository;

    @Autowired
    DraftStoryRepository draftStoryRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    ObjectMapper objectMapper;


    public boolean isNumber(String value){
        try{
            double val = Double.parseDouble(value);
            return true;
        } catch(Exception ex){
            return false;
        }
    }

    public boolean isNumberCondition(String value){
        List<String> number_conditions = ConstantsList.getNumberConditionList();
        return number_conditions.contains(value);
    }

    public boolean isStringCondition(String value){
        List<String> string_conditions = ConstantsList.getStringConditionList();
        return string_conditions.contains(value);
    }

    public boolean isNumOperation(String value){
        List<String> number_ops = ConstantsList.getNumberOperationList();
        return number_ops.contains(value);
    }

    public boolean isStringOperation(String value){
        List<String> string_ops = ConstantsList.getStringOperationList();
        return string_ops.contains(value);
    }

    @Override
    public HashMap<String, String> validateStoryinfo(CreateStoryDto storyDto) {
        HashMap<String, String> errors = new HashMap<>();

        if(storyDto.getIntro().getBytes(StandardCharsets.UTF_8).length > 2 * 1024 * 1024){
            errors.put("MAX_SIZE_STORY_INTRO", "Nội dung giới thiệu truyện chỉ có tối đa 2MB");
            return errors;
        }

        String storyIntro = MyStringUtils.removeHtmlTags(storyDto.getIntro());

        if(storyDto.getTags().size() == 0){
            errors.put("TAGS", "Chưa gắn thẻ cho truyện");
        } else if(storyDto.getScreens().size() == 0){
            errors.put("SCREENS", "Chưa có màn hình cho truyện");
        } else if(storyIntro.length() < 10){
            errors.put("STORY_INTRO", "Nội dung giói thiệu truyện phải ít nhất 10 kí tự");
        } else {
            CreateStoryInformationDto informationDto = storyDto.getInformations().size() > 0 ? storyDto.getInformations().get(0) : null;
            List<String> screenIds = storyDto.getScreens().stream().map(s -> s.getId()).collect(Collectors.toList());

            //check first screen exist
            if(!screenIds.contains(storyDto.getFirstScreenId())){
                errors.put("FIRST_SCREEN_ID", "Chưa có màn hình đầu tiên cho truyện");
                return errors;
            }

            //check story information
            if(storyDto.getInformations().size() > 1){
                errors.put("INFORMATION", "Chỉ được thêm 1 thông tin cho truyện");
                return errors;
            } else if(storyDto.getInformations().size() == 1){
                String type = informationDto.getType();

                if(type.equals(INFORMATION_TYPES.NUMBER.toString())){
                   if(!isNumber(informationDto.getValue())){
                       errors.put("INFORMATION", "Giá trị thông tin truyện không phải là số");
                       return errors;
                   }
                }

                //check information conditions list
                for(CreateStoryConditionDto cond: informationDto.getConditions()){
                    if(!screenIds.contains(cond.getNextScreenId())){
                        errors.put("CONDITION_NEXT_SCREEN_ID", "Chưa có chuyển màn hình cho điều kiện thông tin");
                    } else if(type.equals(INFORMATION_TYPES.NUMBER.toString())){
                        if(!isNumber(cond.getValue())){
                            errors.put("INFORMATION_CONDITION", "Giá trị điều kiện thông tin truyện không phải là số");
                        } else if(!isNumberCondition(cond.getType())){
                            errors.put("INFORMATION_CONDITION", "Điều kiện thông tin truyện không tồn tại");
                        }
                    } else if(type.equals(INFORMATION_TYPES.STRING.toString())){
                        if(!isStringCondition(cond.getType())){
                            errors.put("INFORMATION_CONDITION", "Điều kiện thông tin truyện không tồn tại");
                        }
                    }
                    if(errors.size() > 0) return errors;
                }

                //check all information actions
                for(CreateStoryInformationActionDto informationActionDto: storyDto.getInformationActions()){
                    String value = informationActionDto.getValue();
                    String operation = informationActionDto.getOperation();
                    if(type.equals(INFORMATION_TYPES.NUMBER.toString())){
                        if(!isNumber(value)){
                            errors.put("INFORMATION_ACTION", "Giá trị ảnh hưởng thông tin không phải là số");
                        } else if(!isNumOperation(operation)){
                            errors.put("INFORMATION_ACTION", "Ảnh hưởng thông tin không tồn tại");
                        }
                    } else if(type.equals(INFORMATION_TYPES.STRING.toString())){
                        if(!isStringOperation(operation)){
                            errors.put("INFORMATION_ACTION", "Ảnh hưởng thông tin không tồn tại");
                        }
                    }
                    if(errors.size() > 0) return errors;
                }
            }

            //check all screens
            if(storyDto.getScreens().size() > 100) {
                errors.put("MAX_SCREENS", "Truyện chỉ có tối đa 100 màn hình!");
                return errors;
            }

            for(CreateStoryScreenDto screen: storyDto.getScreens()){
                if(screen.getContent().getBytes(StandardCharsets.UTF_8).length > 2 * 1024 * 1024){
                    errors.put("MAX_SIZE_SCREEN_CONTENT", "Nội dung màn hình chỉ có tối đa 2MB");
                    return errors;
                }

                String content = MyStringUtils.removeHtmlTags(screen.getContent());

                if(content.length() < 10){
                    errors.put("SCREEN_CONTENT", "Nội dung màn hình phải có tối thiểu 10 kí tự");
                } else {
                    //check all actions of curent screen
                    if(screen.getActions().size() > 8){
                        errors.put("MAX_ACTIONS", "Màn hình chỉ có tối đa 8 hành động!");
                        return errors;
                    }

                    screen.getActions().stream().forEach(a -> {
                        if(a.getType().equals(ACTION_TYPES.NEXT_SCREEN.toString())){
                            if(!screenIds.contains(a.getValue())){
                                errors.put("NEXT_SCREEN_ACTION", "Chưa có màn hình kế tiếp cho hành động chuyển màn hình");
                            }
                        } else if(a.getType().equals(ACTION_TYPES.UPDATE_INFORMATION.toString())){
                            if(!screenIds.contains(a.getNextScreenId())){
                                errors.put("UPDATE_INFORMATION_ACTION", "Chưa có màn hình kế tiếp cho hành động cập nhật thông tin");
                            } else if(storyDto.getInformations().size() == 0){
                                errors.put("UPDATE_INFORMATION_ACTION", "Truyện chưa có thông tin!");
                            }
                        } else if(a.getType().equals(ACTION_TYPES.REDIRECT.toString())){
                            if(StringUtils.isEmpty(a.getValue())){
                                errors.put("REDIRECT_ACTION", "Chưa có đường dẫn cho hành động đi tới đường dẫn");
                            } else if (!MyStringUtils.isValidUrl(a.getValue())){
                                errors.put("REDIRECT_ACTION", "Đường dẫn không hợp lệ");
                            }
                        }
                    });
                }

                if(errors.size() > 0) return errors;
            }
        }
        return errors;
    }

    @Override
    public Rating getRatingByStoryAndUser(int storyId, int userId) {
        Rating rating = ratingRepository.findById(storyId, userId);
        return rating;
    }

    @Override
    public ResultDto saveCensorship(CensorshipDto censorshipDto) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        Story story = storyRepository.findById(censorshipDto.getStoryId()).orElse(null);
        if (story == null) {
            result.getErrors().put("NOT_FOUND", "Truyện này không có trong hệ thống");
        } else if (story.isDeactiveByAdmin()) {
            result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa bởi admin");
        } else if (!story.isActive()) {
            result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa");
        } else if (!story.isPublished()){
            result.getErrors().put("NOT_FOUND", "Truyện này chưa xuất bản");
        } else {
            story.setCensorshipStatus(censorshipDto.getCensorshipStatus());
            storyRepository.save(story);
            result.setSuccess(true);
        }

        return result;
    }

    @Override
    public ResultDto getStoryDetails(int storyId) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        Story story = storyRepository.findById(storyId).orElse(null);
        if (story == null) {
            result.getErrors().put("NOT_FOUND", "Truyện này không có trong hệ thống");
        } else if (story.isDeactiveByAdmin()) {
            result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa bởi admin");
        } else if (!story.isActive()) {
            result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa");
        } else if (!story.isPublished()){
            result.getErrors().put("NOT_FOUND", "Truyện này chưa xuất bản");
        } else if (!story.getCensorshipStatus().equals(CensorshipStatus.APPROVED)){
            result.getErrors().put("NOT_FOUND", "Truyện này chưa được kiểm duyệt");
        }

        if(result.getErrors().size() > 0) return result;

        User user = userRepository.findById(story.getUserId()).orElse(null);
        if(user == null || (!user.isActive() || user.isDeactiveByAdmin())){
            result.getErrors().put("DELETED", "Truyện này thuộc về người dùng bị vô hiệu tài khoản");
            return result;
        }

        GetStoryDto dto = modelMapper.map(story, GetStoryDto.class);

        List<Tag> tags = tagRepository.findAllByStoryId(story.getId());
        dto.setTags(tagService.mapModelToDto(tags));

        user.setPassword(null);
        dto.setUser(user);

        //get user rating
        Rating rating = ratingRepository.findById(storyId, story.getUserId());
        dto.setRating(rating);

        dto.setNumOfRate(ratingRepository.countRatingByStoryId(story.getId()));

        dto.setNumOfRead(historyRepository.countAllByStoryId(storyId));

        result.setSuccess(true);
        result.setData(dto);
        return result;
    }

    @Override
    public ResultDto changePublishedStatus(int storyId, int userId, boolean turnOnPublished) {
        ResultDto result = new ResultDto();
        Optional<Story> story = storyRepository.findById(storyId);
        result.setSuccess(false);
        if (!story.isPresent()) {
            result.getErrors().put("NOT_FOUND", "Không tìm thấy truyện này");
        } else {
            Story s = story.get();

            if (s.isDeactiveByAdmin()) {
                result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa bởi admin");
            } else if (!s.isActive()) {
                result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa");
            } else if (userId != s.getUserId()) {
                result.getErrors().put("NOT_OWN", "Truyện này không thuộc về bạn");
            } else if (turnOnPublished && !s.isPublished()) {
                s.setPublished(true);
                result.setSuccess(true);
                result.setData(s);
                storyRepository.save(s);
            } else if (!turnOnPublished && s.isPublished()) {
                s.setPublished(false);
                result.setSuccess(true);
                result.setData(s);
                storyRepository.save(s);
            } else {
                result.setSuccess(true);
            }
        }
        return result;
    }

    @Override
    public ResultDto rateStory(int storyId, int userId, double stars) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        Story story = storyRepository.findById(storyId).orElse(null);
        if (story == null) {
            result.getErrors().put("NOT_FOUND", "Truyện này không tồn tại");
        } else if (!story.isActive() || story.isDeactiveByAdmin()) {
            result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa");
        } else {
            Rating rating = ratingRepository.findById(storyId, userId);
            if (rating == null) {
                rating = new Rating();
                rating.setStoryId(storyId);
                rating.setUserId(userId);
                rating.setUpdatedAt(new Date());
            }
            rating.setStars(stars);
            ratingRepository.save(rating);

            double avgStars = ratingRepository.findAvgStarsByStoryId(storyId);
            story.setAvgRate(avgStars);
            storyRepository.save(story);
            result.setData(rating);
            result.setSuccess(true);
        }
        return result;
    }

    @Override
    public ResultDto getReadStatisticsByDateRangeOfUser(Date from, Date to, int userId) {
        ResultDto result = new ResultDto();

        List<ReadStatisticDto> data = historyRepository.findReadingStatisticsByDateRangeOfUser(from, to, userId);
        result.setData(data);
        result.setSuccess(true);
        return result;
    }

    @Override
    public ResultDto changeStoryStatusByUser(int storyId, int userId) {
        ResultDto result = new ResultDto();
        Optional<Story> story = storyRepository.findById(storyId);
        result.setSuccess(false);
        if (!story.isPresent()) {
            result.getErrors().put("NOT_FOUND", "Không tìm thấy truyện này");
        } else {
            Story s = story.get();
            if (!s.isActive()) {
                result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa");
            } else if (s.isDeactiveByAdmin()) {
                result.getErrors().put("NOT_FOUND", "Truyện này đã bị xóa bới admin");
            } else if (userId != s.getUserId()) {
                result.getErrors().put("NOT_OWN", "Truyện này không thuộc về bạn");
            } else {
                s.setActive(false);
                storyRepository.save(s);
                result.setData(s);
                result.setSuccess(true);
            }
        }
        return result;
    }


    public ReadStoryDto getReadingStory(Story story) {

        ReadStoryDto readStoryDto = modelMapper.map(story, ReadStoryDto.class);
        List<Screen> screens = screenRepository.findByStoryId(story.getId());

        List<ReadStoryScreenDto> screenDtoList = screens.stream().map(screen -> {
            ReadStoryScreenDto screenDto = modelMapper.map(screen, ReadStoryScreenDto.class);
            screenDto.setActions(actionRepository.findAllByScreenId(screen.getId()));
            return screenDto;
        }).collect(Collectors.toList());

        List<Information> informations = informationRepository.findAllByStoryId(story.getId());

        List<ReadStoryInformationDto> informationDtos = informations.stream().map(info -> {
            ReadStoryInformationDto informationDto = modelMapper.map(info, ReadStoryInformationDto.class);
            List<InfoCondition> conditions = infoConditionRepository.findAllByInformationId(informationDto.getId());
            informationDto.setConditions(conditions);
            return informationDto;
        }).collect(Collectors.toList());

        List<String> informationIds = informations.stream().map(info -> info.getId())
                .collect(Collectors.toList());

        List<InformationAction> informationActions = informationActionRepository.findAllByInformationIdIn(informationIds);

        List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
        List<ReadStoryTagDto> readStoryTagDtoList = tagList.stream().map(t -> modelMapper.map(t, ReadStoryTagDto.class)).collect(Collectors.toList());

        readStoryDto.setInformationActions(informationActions);
        readStoryDto.setScreens(screenDtoList);
        readStoryDto.setInformations(informationDtos);
        readStoryDto.setTags(readStoryTagDtoList);

        return readStoryDto;
    }

    @Override
    public ResultDto getReadingStoryForAdmin(int storyId) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        result.setData(null);

        Story story = storyRepository.findById(storyId).orElse(null);

        if (story == null) {
            result.getErrors().put("NOT_FOUND", "Không tìm thấy truyện này");
        } else if (!story.isActive() || story.isDeactiveByAdmin()) {
            result.getErrors().put("DELETED", "Truyện này đã bị xóa");
        } else {
            User user = userRepository.findById(story.getUserId()).orElse(null);
            if(user == null || (!user.isActive() || user.isDeactiveByAdmin())){
                result.getErrors().put("DELETED", "Truyện này thuộc về người dùng bị vô hiệu tài khoản");
            } else {
                DraftStory draftStory = draftStoryRepository.findById(storyId).orElse(null);
                CreateStoryDto createStoryDto = null;
                try {
                    createStoryDto = objectMapper.readValue(draftStory.getContent(), CreateStoryDto.class);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
                ReadStoryDto readStoryDto = mapCreateStoryToReadStory(createStoryDto);
                readStoryDto.setUser(user);
                readStoryDto.setCensorships(censorshipRepository.findAllByStory(readStoryDto.getId()));
                result.setData(readStoryDto);
                result.setSuccess(true);
            }
        }
        return result;
    }

    @Override
    public ResultDto getReadingStoryForUser(int storyId) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        result.setData(null);

        Story story = storyRepository.findById(storyId).orElse(null);

        if (story == null) {
            result.getErrors().put("NOT_FOUND", "Không tìm thấy truyện này");
        } else if (!story.isActive() || story.isDeactiveByAdmin()) {
            result.getErrors().put("DELETED", "Truyện này đã bị xóa");
        } else {
            User user = userRepository.findById(story.getUserId()).orElse(null);
            if(user == null || (!user.isActive() || user.isDeactiveByAdmin())){
                result.getErrors().put("DELETED", "Truyện này thuộc về người dùng bị vô hiệu tài khoản");
            } else {
                DraftStory draftStory = draftStoryRepository.findById(storyId).orElse(null);
                CreateStoryDto createStoryDto = null;
                try {
                    createStoryDto = objectMapper.readValue(draftStory.getContent(), CreateStoryDto.class);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
                ReadStoryDto readStoryDto = mapCreateStoryToReadStory(createStoryDto);
                readStoryDto.setCensorshipStatus(draftStory.getCensorshipStatus());
                readStoryDto.setUser(user);
                result.setData(readStoryDto);
                result.setSuccess(true);
            }
        }
        return result;
    }

    @Override
    public ResultDto getReadingStoryForReading(int storyId) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        result.setData(null);

        Story story = storyRepository.findById(storyId).orElse(null);

        if (story == null) {
            result.getErrors().put("NOT_FOUND", "Không tìm thấy truyện này");
        } else if (!story.isActive() || story.isDeactiveByAdmin()) {
            result.getErrors().put("DELETED", "Truyện này đã bị xóa");
        } else if(!story.isPublished()){
            result.getErrors().put("NOT_PUBLISHED", "Truyện này chưa xuất bản");
        } else if(!CensorshipStatus.APPROVED.equals(story.getCensorshipStatus())){
            result.getErrors().put("NOT_CENSORED", "Truyện này chưa được kiểm duyệt");
        } else {
            User user = userRepository.findById(story.getUserId()).orElse(null);
            if(user == null || (!user.isActive() || user.isDeactiveByAdmin())){
                result.getErrors().put("DELETED", "Truyện này thuộc về người dùng bị vô hiệu tài khoản");
            } else {
                ReadStoryDto readStoryDto = getReadingStory(story);
                readStoryDto.setUser(user);
                result.setData(readStoryDto);
                result.setSuccess(true);
            }
        }
        return result;
    }

    public ReadStoryDto mapCreateStoryToReadStory(CreateStoryDto createStoryDto){
        ReadStoryDto readStoryDto = modelMapper.map(createStoryDto, ReadStoryDto.class);
        List<ReadStoryScreenDto> screens = createStoryDto.getScreens().stream().map(sc -> {
            ReadStoryScreenDto screenDto = modelMapper.map(sc, ReadStoryScreenDto.class);
            List<Action> actions = sc.getActions().stream().map(ac -> modelMapper.map(ac, Action.class)).collect(Collectors.toList());
            screenDto.setActions(actions);
            return screenDto;
        }).collect(Collectors.toList());
        readStoryDto.setScreens(screens);

        List<ReadStoryInformationDto> informationDtos = createStoryDto.getInformations().stream().map(info -> {
            ReadStoryInformationDto readStoryInformationDto = modelMapper.map(info, ReadStoryInformationDto.class);
            List<InfoCondition> infoConditions = info.getConditions().stream().map(cond -> modelMapper.map(cond, InfoCondition.class)).collect(Collectors.toList());
            readStoryInformationDto.setConditions(infoConditions);
            return readStoryInformationDto;
        }).collect(Collectors.toList());
        readStoryDto.setInformations(informationDtos);

        List<ReadStoryTagDto> tags = createStoryDto.getTags().stream().map(tagId -> {
            Tag tag = tagRepository.findById(tagId).orElse(null);
            ReadStoryTagDto readStoryTagDto = modelMapper.map(tag, ReadStoryTagDto.class);
            return readStoryTagDto;
        }).collect(Collectors.toList());
        readStoryDto.setTags(tags);

        List<InformationAction> informationActions = createStoryDto.getInformationActions().stream().map(ia -> modelMapper.map(ia, InformationAction.class)).collect(Collectors.toList());
        readStoryDto.setInformationActions(informationActions);

        return readStoryDto;
    }

//    public void saveStory(CreateStoryDto createStoryDto, Story story){
//        HashMap<String, String> screenIdsMap = new HashMap<>();
//        HashMap<String, String> actionIdsMap = new HashMap<>();
//        HashMap<String, String> informationIdsMap = new HashMap<>();
//
//        createStoryDto.getScreens().stream().forEach(screen -> {
//            screenIdsMap.put(screen.getId(), MyStringUtils.generateUniqueId());
//        });
//
//        //insert story tags
//        createStoryDto.getTags().stream().forEach(tagId -> {
//            StoryTag st = new StoryTag();
//            st.setTagId(tagId);
//            st.setStoryId(createStoryDto.getId());
//            storyTagRepository.insertStoryTag(st);
//        });
//
//        //save all screens
//        createStoryDto.getScreens().stream().forEach(screen -> {
//            Screen savedScreen = modelMapper.map(screen, Screen.class);
//
//            savedScreen.setStoryId(createStoryDto.getId());
//            savedScreen.setId(screenIdsMap.get(screen.getId()));
//
//            screenRepository.insertScreen(savedScreen);
//
//            screen.getActions().stream().forEach(action -> {
//                Action savedAction = modelMapper.map(action, Action.class);
//
//                savedAction.setId(MyStringUtils.generateUniqueId());
//                savedAction.setScreenId(savedScreen.getId());
//                if (action.getType().equals(ACTION_TYPES.NEXT_SCREEN.toString())) {
//                    savedAction.setValue(screenIdsMap.get(action.getValue()));
//                }
//                savedAction.setNextScreenId(screenIdsMap.get(action.getNextScreenId()));
//                actionIdsMap.put(action.getId(), savedAction.getId());
//
//                actionRepository.insertAction(savedAction);
//            });
//        });
//
//        //set first screen id for story
//        story.setFirstScreenId(screenIdsMap.get(createStoryDto.getFirstScreenId()));
//        storyRepository.updateFirstScreen(story);
//
//        //save all informations
//        List<InfoCondition> savedInfoConditions = new ArrayList<>();
//        List<Information> savedInforomations = createStoryDto.getInformations().stream().map(information -> {
//            Information savedInformation = modelMapper.map(information, Information.class);
//            savedInformation.setStoryId(story.getId());
//            savedInformation.setId(MyStringUtils.generateUniqueId());
//            informationIdsMap.put(information.getId(), savedInformation.getId());
//
//            information.getConditions().stream().forEach(condition -> {
//                InfoCondition savedInfoCondition = modelMapper.map(condition, InfoCondition.class);
//
//                savedInfoCondition.setInformationId(savedInformation.getId());
//                savedInfoCondition.setId(MyStringUtils.generateUniqueId());
//                savedInfoCondition.setNextScreenId(screenIdsMap.get(condition.getNextScreenId()));
//
//                savedInfoConditions.add(savedInfoCondition);
//            });
//
//            return savedInformation;
//        }).collect(Collectors.toList());
//
//        informationRepository.saveAll(savedInforomations);
//        infoConditionRepository.saveAll(savedInfoConditions);
//
//        //save information action
//        createStoryDto.getInformationActions().stream().forEach(informationAction -> {
//            InformationAction savedInformationAction = modelMapper.map(informationAction, InformationAction.class);
//            savedInformationAction.setActionId(actionIdsMap.get(informationAction.getActionId()));
//            savedInformationAction.setInformationId(informationIdsMap.get(informationAction.getInformationId()));
//            informationActionRepository.insertInfoAction(savedInformationAction);
//        });
//    }

    public String parseObjectToJson(CreateStoryDto createStoryDto){
        String json = "";
        try {
            json = objectMapper.writeValueAsString(createStoryDto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return json;
    }

    @Override
    public CreateStoryDto saveStory(CreateStoryDto storyDto, Story foundStory){
        Story story = modelMapper.map(storyDto, Story.class);
        HashMap<String, String> screenIdsMap = new HashMap<>();
        HashMap<String, String> actionIdsMap = new HashMap<>();
        HashMap<String, String> informationIdsMap = new HashMap<>();

        //delete unused screen
        List<String> screenIdList = storyDto.getScreens().stream().map(scr -> scr.getId()).collect(Collectors.toList());

        List<String> screenIds = screenRepository.findScreenIdsByStory(story.getId());

        List<String> deletedScreens = new ArrayList<>();
        screenIds.stream().forEach(screenId -> {
            if(!screenIdList.contains(screenId)){
                deletedScreens.add(screenId);
            }
        });


        if(deletedScreens.size() > 0){
            screenRepository.deleteAllByIds(deletedScreens);
        }

        storyDto.getScreens().stream().forEach(screen -> {
            if(screenRepository.existsById(screen.getId())){
                screenIdsMap.put(screen.getId(), screen.getId());
            } else {
                screenIdsMap.put(screen.getId(), MyStringUtils.generateUniqueId());
            }
        });

        story.setFirstScreenId(screenIdsMap.get(storyDto.getFirstScreenId()));
//        story.setCreatedAt(foundStory.getCreatedAt());
        story.setActive(true);
        story.setDeactiveByAdmin(foundStory.isDeactiveByAdmin());
        story.setAvgRate(foundStory.getAvgRate());
        story.setUserId(foundStory.getUserId());
        story.setCensorshipStatus(foundStory.getCensorshipStatus());
        story.setCreatedAt(foundStory.getCreatedAt());

//        if(storyDto.isRequestCensorship() && !CensorshipStatus.PENDING.equals(story.getCensorshipStatus())){
//            Censorship censorship = new Censorship();
//            censorship.setCensorshipStatus(CensorshipStatus.PENDING);
//            censorship.setUserNote(storyDto.getUserNote());
//            censorship.setStoryId(storyDto.getId());
//            censorshipRepository.save(censorship);
//        }

        storyRepository.save(story);
        int storyId = story.getId();

        storyTagRepository.deleteByStoryId(storyId);
        //insert story tags
        storyDto.getTags().stream().forEach(tagId -> {
            StoryTag st = new StoryTag();
            st.setTagId(tagId);
            st.setStoryId(storyId);
            storyTagRepository.insertStoryTag(st);
        });

        //insert new screens
//            List<Action> savedActions = new ArrayList<>();
        List<String> deletedActions = new ArrayList<>();

//            List<Thread> threads = new ArrayList<>();
        storyDto.getScreens().stream().forEach(screen -> {

            Screen savedScreen = modelMapper.map(screen, Screen.class);

            savedScreen.setStoryId(storyId);
            savedScreen.setId(screenIdsMap.get(screen.getId()));
            //delete all actions


//                deletedActions.addAll(actionIdList);
            if(screenIds.contains(savedScreen.getId())){
                screenRepository.updateScreenById(savedScreen);
            } else {
                screenRepository.insertScreen(savedScreen);
            }

            List<String> newActionIds = screen.getActions().stream().map(a -> a.getId()).collect(Collectors.toList());
            List<String> actionIdList = actionRepository.findActionIdsScreen(savedScreen.getId());
            for(String actionId: actionIdList){
                if(!newActionIds.contains(actionId)) deletedActions.add(actionId);
            }

            screen.getActions().stream().forEach(action -> {
                Action savedAction = modelMapper.map(action, Action.class);

                if(!actionIdList.contains(action.getId())){
                    savedAction.setId(MyStringUtils.generateUniqueId());
                }
                savedAction.setScreenId(savedScreen.getId());
                if (action.getType().equals(ACTION_TYPES.NEXT_SCREEN.toString())) {
                    savedAction.setValue(screenIdsMap.get(action.getValue()));
                }
                savedAction.setNextScreenId(screenIdsMap.get(action.getNextScreenId()));
                actionIdsMap.put(action.getId(), savedAction.getId());

                actionRepository.save(savedAction);
            });
        });

        actionRepository.deleteAllByIds(deletedActions);

        //delete all informations
        List<Information> informations = informationRepository.findAllByStoryId(storyId);
        List<String> informationIds = informations.stream().map((i -> i.getId())).collect(Collectors.toList());
        informationRepository.deleteInBatch(informations);

        //delete all information actions
        List<InformationAction> informationActionList = informationActionRepository.findAllByInformationIdIn(informationIds);
        informationActionRepository.deleteInBatch(informationActionList);


        //insert new informations
        List<InfoCondition> savedInfoConditions = new ArrayList<>();
        List<Information> savedInformations = storyDto.getInformations().stream().map(information -> {
            Information savedInformation = modelMapper.map(information, Information.class);
            savedInformation.setStoryId(storyId);
            savedInformation.setId(MyStringUtils.generateUniqueId());
            informationIdsMap.put(information.getId(), savedInformation.getId());

            information.getConditions().stream().forEach(condition -> {
                InfoCondition savedInfoCondition = modelMapper.map(condition, InfoCondition.class);

                savedInfoCondition.setInformationId(savedInformation.getId());
                savedInfoCondition.setId(MyStringUtils.generateUniqueId());
                savedInfoCondition.setNextScreenId(screenIdsMap.get(condition.getNextScreenId()));
                savedInfoConditions.add(savedInfoCondition);

            });

            return savedInformation;
        }).collect(Collectors.toList());

        informationRepository.saveAll(savedInformations);
        infoConditionRepository.saveAll(savedInfoConditions);

        //save information action
        storyDto.getInformationActions().stream().forEach(informationAction -> {
            InformationAction savedInformationAction = modelMapper.map(informationAction, InformationAction.class);
            savedInformationAction.setActionId(actionIdsMap.get(informationAction.getActionId()));
            savedInformationAction.setInformationId(informationIdsMap.get(informationAction.getInformationId()));

            informationActionRepository.insertInfoAction(savedInformationAction);
        });

        storyDto.getScreens().stream().forEach(sc -> {
            sc.setId(screenIdsMap.get(sc.getId()));
            sc.getActions().stream().forEach(a -> {
                a.setId(actionIdsMap.get(a.getId()));
                a.setNextScreenId(screenIdsMap.get(a.getNextScreenId()));
                if(a.getType().equals(ACTION_TYPES.NEXT_SCREEN)){
                    a.setValue(screenIdsMap.get(a.getValue()));
                }
            });
        });
        storyDto.getInformations().stream().forEach(i -> {
            i.setId(informationIdsMap.get(i.getId()));
            i.getConditions().stream().forEach(cond -> {
                cond.setNextScreenId(screenIdsMap.get(cond.getNextScreenId()));
            });
        });

        storyDto.setFirstScreenId(screenIdsMap.get(storyDto.getFirstScreenId()));
        storyDto.getInformationActions().stream().forEach(ia -> {
            ia.setActionId(actionIdsMap.get(ia.getActionId()));
            ia.setInformationId(informationIdsMap.get(ia.getInformationId()));
        });

        return storyDto;
    }

    @Override
    public ResultDto createStory(CreateStoryDto createStoryDto, int userId) {
        ResultDto result = new ResultDto();
        HashMap<String, String> errors = validateStoryinfo(createStoryDto);


        if(errors.size() > 0){
            result.setSuccess(false);
            result.setErrors(errors);
            return result;
        }

        Story story = modelMapper.map(createStoryDto, Story.class);

        story.setFirstScreenId(null);
        story.setActive(true);
        story.setPublished(createStoryDto.isPublished());
        story.setDeactiveByAdmin(false);
        story.setUpdatedAt(new Date());
        story.setUserId(userId);

        story = storyRepository.save(story);
        int storyId = story.getId();

        createStoryDto.setId(storyId);
        createStoryDto.getScreens().stream().forEach(sc -> sc.setStoryId(storyId));
        createStoryDto.getInformations().forEach(i -> i.setStoryId(storyId));

        DraftStory draftStory = new DraftStory();

        if(createStoryDto.isRequestCensorship()){
            Censorship censorship = new Censorship();
            censorship.setCensorshipStatus(CensorshipStatus.PENDING);
            censorship.setUserNote(createStoryDto.getUserNote());
            censorship.setStoryId(storyId);
            censorshipRepository.save(censorship);
            draftStory.setCensorshipStatus(CensorshipStatus.PENDING);
        } else {
            draftStory.setCensorshipStatus(null);
        }

        draftStory.setId(storyId);
        draftStory.setContent(parseObjectToJson(createStoryDto));
        draftStoryRepository.save(draftStory);

        result.setSuccess(true);
        result.setErrors(null);
        result.setData(story);

        return result;
    }

    @Override
    public ResultDto updateStory(CreateStoryDto storyDto, int userId) {
        ResultDto resultDto = new ResultDto();
        HashMap<String, String> errors = validateStoryinfo(storyDto);

        if(errors.size() > 0){
            resultDto.setSuccess(false);
            resultDto.setErrors(errors);
            return resultDto;
        }

        Story foundStory = storyRepository.findById(storyDto.getId()).orElse(null);

        if (foundStory == null) {
            resultDto.getErrors().put("NOT_FOUND", "Truyện này không có trong hệ thống!");
        } else if (!foundStory.isActive() || foundStory.isDeactiveByAdmin()) {
            resultDto.getErrors().put("DELETED", "Truyện đã bị xóa!");
        } else if (userId != foundStory.getUserId()) {
            resultDto.getErrors().put("NOT_OWN", "Truyện này không thuộc về bạn");
        } else {

            DraftStory draftStory = draftStoryRepository.findById(storyDto.getId()).orElse(null);
            draftStory.setContent(parseObjectToJson(storyDto));
            if(storyDto.isRequestCensorship()){
                if(!CensorshipStatus.PENDING.equals(draftStory.getCensorshipStatus())){
                    Censorship censorship = new Censorship();
                    censorship.setCensorshipStatus(CensorshipStatus.PENDING);
                    censorship.setUserNote(storyDto.getUserNote());
                    censorship.setStoryId(storyDto.getId());
                    censorshipRepository.save(censorship);
                }
                draftStory.setCensorshipStatus(CensorshipStatus.PENDING);
            } else {
                draftStory.setCensorshipStatus(null);
            }
            draftStoryRepository.save(draftStory);

            resultDto.setSuccess(true);
            resultDto.setData(foundStory);
        }
        return resultDto;
    }

    public void mapStoryToStoryDraftInDB(){
        List<Story> stories = storyRepository.findAll();
//        Story story = storyRepository.findById(419).orElse(null);

        for(Story story: stories){
            if(story.getId() != 422 && story.getId() != 419){
                ReadStoryDto readStoryDto = getReadingStory(story);
                CreateStoryDto createStoryDto = mapReadStoryToCreateStoryDto(readStoryDto);
                DraftStory draftStory = new DraftStory();
                draftStory.setId(createStoryDto.getId());
                draftStory.setCensorshipStatus(CensorshipStatus.APPROVED);
                draftStory.setContent(parseObjectToJson(createStoryDto));
                draftStoryRepository.save(draftStory);
                System.out.println("ok: " + story.getId());
            }
        }
        System.out.println("Done mapping story to storydraft in DB");
    }

    public CreateStoryDto mapReadStoryToCreateStoryDto(ReadStoryDto readStoryDto){
//        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD);
        modelMapper.getConfiguration().setAmbiguityIgnored(true);

//        CreateStoryDto createStoryDto = modelMapper.map(readStoryDto, CreateStoryDto.class);
        CreateStoryDto createStoryDto = new CreateStoryDto();
        createStoryDto.setId(readStoryDto.getId());
        createStoryDto.setUserId(readStoryDto.getUserId());
        createStoryDto.setFirstScreenId(readStoryDto.getFirstScreenId());
        createStoryDto.setAnimation(readStoryDto.getAnimation());
        createStoryDto.setImage(readStoryDto.getImage());
        createStoryDto.setIntro(readStoryDto.getIntro());
        createStoryDto.setPublished(readStoryDto.isPublished());
        createStoryDto.setTitle(readStoryDto.getTitle());


        List<CreateStoryScreenDto> createStoryScreenDtos = readStoryDto.getScreens().stream().map(sc -> {
            CreateStoryScreenDto createStoryScreenDto = modelMapper.map(sc, CreateStoryScreenDto.class);
            List<CreateStoryActionDto> actionDtos = sc.getActions().stream().map(a -> modelMapper.map(a, CreateStoryActionDto.class)).collect(Collectors.toList());
            createStoryScreenDto.setActions(actionDtos);
            return createStoryScreenDto;
        }).collect(Collectors.toList());
        createStoryDto.setScreens(createStoryScreenDtos);

        List<CreateStoryInformationDto> createStoryInformationDtos = readStoryDto.getInformations().stream().map(info -> {
            CreateStoryInformationDto createStoryInformationDto = modelMapper.map(info, CreateStoryInformationDto.class);
            List<CreateStoryConditionDto> createStoryConditionDtos = createStoryInformationDto.getConditions().stream().map(cond -> modelMapper.map(cond, CreateStoryConditionDto.class)).collect(Collectors.toList());
            createStoryInformationDto.setConditions(createStoryConditionDtos);
            createStoryInformationDto.getStoryId();
            return createStoryInformationDto;
        }).collect(Collectors.toList());
        createStoryDto.setInformations(createStoryInformationDtos);

        List<CreateStoryInformationActionDto> createStoryInformationActionDtos = readStoryDto.getInformationActions().stream().map(ia -> modelMapper.map(ia, CreateStoryInformationActionDto.class)).collect(Collectors.toList());
        createStoryDto.setInformationActions(createStoryInformationActionDtos);

        Set<Integer> tags = readStoryDto.getTags().stream().map(tag -> tag.getId()).collect(Collectors.toSet());
        createStoryDto.setTags(tags);

        return createStoryDto;
    }

    @Override
    public Page<GetStoryDto> searchStories(Set<Integer> tags, String keyword, boolean isActive,
                                           boolean isPublished, int page, int itemsPerPage) {
        if (StringUtils.isEmpty(keyword)) keyword = "";
        if (tags.size() == 0) {
            tags = tagRepository.findAll().stream().map(t -> t.getId()).collect(Collectors.toSet());
        }

        Pageable pageable = PageRequest.of(page - 1, itemsPerPage, Sort.by("id").ascending());
        Page<Story> page1 = storyRepository.findAllBySearchCondition(keyword, tags, isActive, isPublished, pageable);
        Page<GetStoryDto> page2 = page1.map(new Function<Story, GetStoryDto>() {
            @Override
            public GetStoryDto apply(Story story) {
                List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
                GetStoryDto dto = modelMapper.map(story, GetStoryDto.class);
                dto.setTags(tagService.mapModelToDto(tagList));
                User user = userRepository.findById(story.getUserId()).orElse(null);
                if (user != null) user.setPassword(null);
                dto.setUser(user);
                dto.setNumOfRead(historyRepository.countAllByStoryId(story.getId()));
                return dto;
            }
        });


        return page2;
    }

    @Override
    public Page<GetStoryDto> searchStoriesOfUserProfile(int userId, Set<Integer> tags, String keyword, int page, int itemsPerPage) {
        if (StringUtils.isEmpty(keyword)) keyword = "";
        if (tags.size() == 0) {
            tags = tagRepository.findAll().stream().map(t -> t.getId()).collect(Collectors.toSet());
        }

        Pageable pageable = PageRequest.of(page - 1, itemsPerPage, Sort.by("id").descending());
        Page<Story> page1 = storyRepository.findAllByUserProfile(userId, keyword, tags, pageable);
        Page<GetStoryDto> page2 = page1.map(new Function<Story, GetStoryDto>() {
            @Override
            public GetStoryDto apply(Story story) {
                List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
                GetStoryDto dto = modelMapper.map(story, GetStoryDto.class);
                User user = userRepository.findById(story.getUserId()).orElse(null);
                if(user != null) user.setPassword(null);
                dto.setUser(user);
                dto.setTags(tagService.mapModelToDto(tagList));
                dto.setNumOfRead(historyRepository.countAllByStoryId(story.getId()));
                return dto;
            }
        });
        return page2;
    }

    GetStoryDto mapModelToDto(Story story) {
        List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
        GetStoryDto dto = modelMapper.map(story, GetStoryDto.class);
        dto.setTags(tagService.mapModelToDto(tagList));
        dto.setNumOfRead(historyRepository.countAllByStoryId(story.getId()));
        return dto;
    }

    @Override
    public List<GetStoryDto> getTheMostReadingStories() {
        List<Story> storyList = storyRepository.findTheMostReadingStories();
        return storyList.stream().map(s -> {
            GetStoryDto dto = modelMapper.map(s, GetStoryDto.class);
            List<Tag> tags = tagRepository.findAllByStoryId(s.getId());
            dto.setTags(tagService.mapModelToDto(tags));
            dto.setUser(userRepository.findById(s.getUserId()).orElse(null));
            dto.setNumOfRead(historyRepository.countAllByStoryId(s.getId()));
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Page<GetStoryDto> getStoriesForAdmin(String keyword, String orderBy, String censorshipStatus, boolean asc, int page, int itemsPerPage) {

        Pageable pageable = PageRequest.of(page - 1, itemsPerPage);
        Page<Story> page1 = null;
        switch (orderBy) {
            case "avg_rate":
                if (asc) page1 = storyRepository.findForAdminOrderByAvgRateASC(keyword, censorshipStatus, pageable);
                else page1 = storyRepository.findForAdminOrderByAvgRateDESC(keyword, censorshipStatus, pageable);
                break;
            case "comment":
                if (asc) page1 = storyRepository.findForAdminOrderByNumOfCommentASC(keyword, censorshipStatus, pageable);
                else page1 = storyRepository.findForAdminOrderByNumOfCommentDESC(keyword, censorshipStatus, pageable);
                break;
            case "rating":
                if (asc) page1 = storyRepository.findForAdminOrderByNumOfRatingASC(keyword, censorshipStatus, pageable);
                else page1 = storyRepository.findForAdminOrderByNumOfRatingDESC(keyword, censorshipStatus, pageable);
                break;
            case "screen":
                if (asc) page1 = storyRepository.findForAdminOrderByNumOfScreenASC(keyword, censorshipStatus, pageable);
                else page1 = storyRepository.findForAdminOrderByNumOfScreenDESC(keyword, censorshipStatus, pageable);
                break;
            case "read":
                if (asc) page1 = storyRepository.findForAdminOrderByNumOfReadASC(keyword, censorshipStatus, pageable);
                else page1 = storyRepository.findForAdminOrderByNumOfReadDESC(keyword, censorshipStatus, pageable);
                break;
            case "date":
                if(asc) page1 = storyRepository.findForAdminOrderDateASC(keyword, censorshipStatus, pageable);
                else page1 = storyRepository.findForAdminOrderDateDESC(keyword, censorshipStatus, pageable);
                break;
        }

        if (page1 == null) return null;

        Page<GetStoryDto> page2 = page1.map(new Function<Story, GetStoryDto>() {
            @Override
            public GetStoryDto apply(Story story) {
                return mapStoryModelToGetStoryDto(story);
            }
        });
        return page2;
    }

    public GetStoryDto mapStoryModelToGetStoryDto(Story story) {
        List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
        GetStoryDto dto = modelMapper.map(story, GetStoryDto.class);
        dto.setTags(tagService.mapModelToDto(tagList));
        dto.setNumOfComment(commentRepository.countCommentByStoryId(story.getId()));
        dto.setNumOfScreen(screenRepository.countAllByStoryId(story.getId()));
        dto.setNumOfRate(ratingRepository.countRatingByStoryId(story.getId()));
        User user = userRepository.findById(story.getUserId()).orElse(null);
        if(user != null) user.setPassword(null);
        dto.setUser(user);
        dto.setNumOfRead(historyRepository.countAllByStoryId(story.getId()));
        dto.setCensorshipStatus(draftStoryRepository.getCensorshipStatusOfStoryDraft(dto.getId()));
        return dto;
    }

    @Override
    public List<GetStoryDto> getStoriesForUser(int userId) {
//        Pageable pageable = PageRequest.of(page - 1, itemsPerPage);
//        Page<Story> page1 = null;
//        switch (orderBy) {
//            case "avg_rate":
//                if (asc) page1 = storyRepository.findForUserOrderByAvgRateASC(userId, keyword, pageable);
//                else page1 = storyRepository.findForUserOrderByAvgRateDESC(userId, keyword, pageable);
//                break;
//            case "read":
//                if (asc) page1 = storyRepository.findForUserOrderByNumOfReadASC(userId, keyword, pageable);
//                else page1 = storyRepository.findForUserOrderByNumOfReadDESC(userId, keyword, pageable);
//                break;
//            case "comment":
//                if (asc) page1 = storyRepository.findForUserOrderByNumOfCommentASC(userId, keyword, pageable);
//                else page1 = storyRepository.findForUserOrderByNumOfCommentDESC(userId, keyword, pageable);
//                break;
//            case "rating":
//                if (asc) page1 = storyRepository.findForUserOrderByNumOfRatingASC(userId, keyword, pageable);
//                else page1 = storyRepository.findForUserOrderByNumOfRatingDESC(userId, keyword, pageable);
//                break;
//            case "screen":
//                if (asc) page1 = storyRepository.findForUserOrderByNumOfScreenASC(userId, keyword, pageable);
//                else page1 = storyRepository.findForUserOrderByNumOfScreenDESC(userId, keyword, pageable);
//                break;
//            case "date":
//                if(asc) page1 = storyRepository.findForUserOrderByDateASC(userId, keyword,  pageable);
//                else page1 = storyRepository.findForUserOrderByDateDESC(userId, keyword, pageable);
//                break;
//        }
//
//        if (page1 == null) return null;
//
//        Page<GetStoryDto> page2 = page1.map(new Function<Story, GetStoryDto>() {
//            @Override
//            public GetStoryDto apply(Story story) {
//                return mapStoryModelToGetStoryDto(story);
//            }
//        });
//        return page2;
        List<Story> stories = storyRepository.findAllByUserId(userId);
        List<GetStoryDto> getStoryDtos = stories.stream().map(st -> mapStoryModelToGetStoryDto(st)).collect(Collectors.toList());
        return getStoryDtos;
    }

    @Override
    public ResultDto changeStoryStatusByAdmin(int storyId, boolean disable) {
        ResultDto result = new ResultDto();
        Story story = storyRepository.findById(storyId).orElse(null);
        if (story == null) {
            result.getErrors().put("NOT_FOUND", "Không tìm thấy truyện này");
            result.setSuccess(false);
        } else {
            if (!story.isDeactiveByAdmin() && disable) {
                story.setDeactiveByAdmin(true);
            } else if (story.isDeactiveByAdmin() && !disable) {
                story.setDeactiveByAdmin(false);
            }
            storyRepository.save(story);
            result.setSuccess(true);
            result.setData(story);
        }
        return result;
    }



}
