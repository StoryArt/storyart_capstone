package com.storyart.storyservice.service;

import com.storyart.storyservice.common.constants.ACTION_TYPES;
import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.dto.TagDto;
import com.storyart.storyservice.dto.create_story.CreateStoryDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.dto.read_story.ReadStoryDto;
import com.storyart.storyservice.dto.read_story.ReadStoryInformationDto;
import com.storyart.storyservice.dto.read_story.ReadStoryScreenDto;
import com.storyart.storyservice.model.*;
import com.storyart.storyservice.repository.*;
import com.storyart.storyservice.utils.MyStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public interface StoryService {
    HashMap<String, String> validateStoryinfo(CreateStoryDto story);
    GetStoryDto getStoryDetails(int id);
    List<GetStoryDto> getStoriesByUserId(int userId);
    ResultDto getReadingStory(int storyId);
    ResultDto createStory(CreateStoryDto story);
    ResultDto updateStory(CreateStoryDto story);
    Page<GetStoryDto> searchStories(Set<Integer> tags, String keyword, boolean isActive,
                              boolean isPublished, int page, int itemsPerPage);
    List<GetStoryDto> getTrendingStories(int quantity);
    Page<Story> getNewReleaseStory(int quantity);

    void createTempStories();
    List<GetStoryDto> getAll();

    Page<GetStoryDto> getStoriesForAdmin(String keyword, String orderBy, boolean asc, int page, int itemsPerPage);
    ResultDto updateByAdmin(int storyId, boolean disable);
}

@Service
class StoryServiceImpl implements StoryService{
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
    ModelMapper modelMapper;

    @Override
    public HashMap<String, String> validateStoryinfo(CreateStoryDto storyDto) {
        HashMap<String, String> errors = new HashMap<>();


        if(errors.size() > 0) return errors;

        return errors;
    }

    @Override
    public GetStoryDto getStoryDetails(int id) {
        Optional<Story> story = storyRepository.findById(id);
        if(!story.isPresent()) return null;
        GetStoryDto dto = modelMapper.map(story.get(), GetStoryDto.class);
        List<Tag> tags = tagRepository.findAllByStoryId(story.get().getId());
        dto.setTags(tagService.mapModelToDto(tags));
        return dto;
    }

    @Override
    public List<GetStoryDto> getStoriesByUserId(int userId) {
        List<Story> stories = storyRepository.findAllByUserId(userId);
        return stories.stream().map(s -> {
            GetStoryDto dto = modelMapper.map(s, GetStoryDto.class);
            List<Tag> tags = tagRepository.findAllByStoryId(dto.getId());
            List<TagDto> tagDtoList = tagService.mapModelToDto(tags);
            dto.setTags(tagDtoList);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public ResultDto getReadingStory(int storyId) {
        ResultDto result = new ResultDto();
        result.setSuccess(true);
        Optional<Story> story = storyRepository.findById(storyId);
        if(!story.isPresent()){
            result.setData(null);
        } else {
            ReadStoryDto readStoryDto = modelMapper.map(story.get(), ReadStoryDto.class);
            List<Screen> screens = screenRepository.findByStoryId(storyId);

            List<ReadStoryScreenDto> screenDtoList = screens.stream().map(screen -> {
                ReadStoryScreenDto screenDto = modelMapper.map(screen, ReadStoryScreenDto.class);
                screenDto.setActions(actionRepository.findAllByScreenId(screen.getId()));
                return screenDto;
            }).collect(Collectors.toList());

            List<Information> informations = informationRepository.findAllByStoryId(storyId);

            List<ReadStoryInformationDto> informationDtos = informations.stream().map(info -> {
                ReadStoryInformationDto informationDto = modelMapper.map(info, ReadStoryInformationDto.class);
                List<InfoCondition> conditions = infoConditionRepository.findAllByInformationId(informationDto.getId());
                informationDto.setConditions(conditions);
                return informationDto;
            }).collect(Collectors.toList());

            List<String> informationIds = informations.stream().map(info -> info.getId())
                                                .collect(Collectors.toList());

            List<InformationAction> informationActions = informationActionRepository.findAllByInformationIdIn(informationIds);

            readStoryDto.setInformationActions(informationActions);
            readStoryDto.setScreens(screenDtoList);
            readStoryDto.setInformations(informationDtos);

            result.setData(readStoryDto);
        }
        return result;
    }

    @Override
    public ResultDto createStory(CreateStoryDto createStoryDto) {

        ResultDto result = new ResultDto();
        Story story = modelMapper.map(createStoryDto, Story.class);

        HashMap<String, String> screenIdsMap = new HashMap<>();
        HashMap<String, String> actionIdsMap = new HashMap<>();
        HashMap<String, String> informationIdsMap = new HashMap<>();

        createStoryDto.getScreens().stream().forEach(screen -> {
            screenIdsMap.put(screen.getId(), MyStringUtils.generateUniqueId());
        });

        story.setFirstScreenId(screenIdsMap.get(createStoryDto.getFirstScreenId()));
        story.setActive(true);
        story.setPublished(createStoryDto.isPublished());

        story = storyRepository.save(story);
        int storyId = story.getId();

        //save all screens
        createStoryDto.getScreens().stream().forEach(screen -> {
            Screen savedScreen = modelMapper.map(screen, Screen.class);

            savedScreen.setStoryId(storyId);
            savedScreen.setId(screenIdsMap.get(screen.getId()));
            savedScreen.setNextScreenId(screenIdsMap.get(screen.getNextScreenId()));
            screenRepository.save(savedScreen);

            screenIdsMap.put(screen.getId(), savedScreen.getId());

            screen.getActions().stream().forEach(action -> {
                Action savedAction = modelMapper.map(action, Action.class);

                savedAction.setId(MyStringUtils.generateUniqueId());
                savedAction.setScreenId(savedScreen.getId());
                if(action.getType().equals(ACTION_TYPES.NEXT_SCREEN.toString())){
                    savedAction.setValue(screenIdsMap.get(action.getValue()));
                }
                savedAction.setNextScreenId(screenIdsMap.get(action.getNextScreenId()));

                actionRepository.save(savedAction);
                actionIdsMap.put(action.getId(), savedAction.getId());
            });
        });

        //save all informations
        createStoryDto.getInformations().stream().forEach(information -> {
            Information savedInformation = modelMapper.map(information, Information.class);
            savedInformation.setStoryId(storyId);
            savedInformation.setId(MyStringUtils.generateUniqueId());
            informationRepository.save(savedInformation);

            informationIdsMap.put(information.getId(), savedInformation.getId());

            information.getConditions().stream().forEach(condition -> {
                InfoCondition savedInfoCondition = modelMapper.map(condition, InfoCondition.class);

                savedInfoCondition.setInformationId(savedInformation.getId());
                savedInfoCondition.setId(MyStringUtils.generateUniqueId());
                savedInfoCondition.setNextScreenId(screenIdsMap.get(condition.getNextScreenId()));

                infoConditionRepository.save(savedInfoCondition);
            });
        });

        //save information action
        createStoryDto.getInformationActions().stream().forEach(informationAction -> {
            InformationAction savedInformationAction = modelMapper.map(informationAction, InformationAction.class);
            savedInformationAction.setActionId(actionIdsMap.get(informationAction.getActionId()));
            savedInformationAction.setInformationId(informationIdsMap.get(informationAction.getInformationId()));

            informationActionRepository.save(savedInformationAction);
        });

        result.setSuccess(true);
        result.setErrors(null);
        result.setData(story);

        return result;
    }

    @Override
    public ResultDto updateStory(CreateStoryDto storyDto) {
        ResultDto resultDto = new ResultDto();
        HashMap<String, String> errors = validateStoryinfo(storyDto);
        resultDto.setErrors(errors);



        return resultDto;
    }

    @Override
    public Page<GetStoryDto> searchStories(Set<Integer> tags, String keyword, boolean isActive,
                                     boolean isPublished, int page, int itemsPerPage) {
        if(StringUtils.isEmpty(keyword)) keyword = "";
        if(tags.size() == 0) {
            tags = tagRepository.findAll().stream().map(t -> t.getId()).collect(Collectors.toSet());
        }

        Pageable pageable =  PageRequest.of(page - 1, itemsPerPage, Sort.by("id").ascending());
        Page<Story> page1 = storyRepository.findAllBySearchCondition(keyword, tags, isActive, isPublished, pageable);
        Page<GetStoryDto> page2 = page1.map(new Function<Story, GetStoryDto>() {
            @Override
            public GetStoryDto apply(Story story) {
                List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
                GetStoryDto dto = modelMapper.map(story, GetStoryDto.class);
                dto.setTags(tagService.mapModelToDto(tagList));
                return dto;
            }
        });


        return page2;
    }

    GetStoryDto mapModelToDto(Story story){
        List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
        GetStoryDto dto = modelMapper.map(story, GetStoryDto.class);
        dto.setTags(tagService.mapModelToDto(tagList));
        return dto;
    }

    @Override
    public List<GetStoryDto> getTrendingStories(int quantity) {
        Pageable pageable =  PageRequest.of(0, quantity, Sort.by("avgRate").descending());
        List<Story> storyList = storyRepository.findAll(pageable).getContent();
        return storyList.stream().map(s -> {
            GetStoryDto dto = modelMapper.map(s, GetStoryDto.class);
            List<Tag> tags = tagRepository.findAllByStoryId(s.getId());
            dto.setTags(tagService.mapModelToDto(tags));
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Page<Story> getNewReleaseStory(int quantity) {
        Pageable pageable =  PageRequest.of(0, quantity, Sort.by("created_at").descending());
        return storyRepository.findStoryOrderByCreateAt(pageable);

    }

    @Override
    public void createTempStories() {

        String[] tags = new String[]{"kinh di", "bi kich", "hai kich", "thieu nhi", "nguoi lon",
                "the gioi", "dong vat", "thuc vat", "kham pha", "thien nhien", "con nguoi", "than thoai",
                "co tich", "quang cao", "marketing", "thuong hieu", "kinh doanh", "tro choi", "bi an",
                "gioi tinh", "giao duc", "chinh tri", "lich su", "nhan van", "nhan loai", "vu tru"};


        List<Tag> savedTags = Arrays.asList(tags).stream().map(tag -> {
            Tag tag1 = new Tag();
            tag1.setTitle(tag);
            return tag1;
        }).collect(Collectors.toList());
        tagRepository.saveAll(savedTags);

        List<Story> stories = new ArrayList<>();
        for(int i = 0; i < 100; i++){
            Story story = new Story();
            story.setTitle(MyStringUtils.randomString(15, 5));
            story.setIntro(MyStringUtils.randomString(150, 120));
            story.setAvgRate(i%5);
            int reads = new Random().nextInt(100) + 10;
            story.setNumOfRead(reads);
            story.setImage("http://lorempixel.com/400/200");
            story.setActive(true);
            story.setDeactiveByAdmin(false);
            story.setPublished(true);
            story.setFirstScreenId("temp");
            stories.add(story);
            Story saved = storyRepository.save(story);
            List<Integer> tagList = getRandomTags(7);
            tagList.stream().forEach(t -> {
                StoryTag st = new StoryTag();
                st.setStoryId(saved.getId());
                st.setTagId(t);
                storyTagRepository.save(st);
            });
        }
        List<Story> savedStories = storyRepository.saveAll(stories);

        savedStories.stream().forEach(story -> {
            int quantity = new Random().nextInt(20) + 4;
            for(int i = 1; i <= quantity; i++){
                Comment comment = new Comment();
                comment.setStoryId(story.getId());
                comment.setContent("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using");
                Rating rating = new Rating();
                rating.setStoryId(story.getId());
                double stars = new Random().nextInt(5);
                rating.setStars(stars);
                commentRepository.save(comment);
                ratingRepository.save(rating);
            }
        });
    }

    @Override
    public List<GetStoryDto> getAll() {
        List<Story> stories = storyRepository.findAll();
        return stories.stream().map(story -> mapModelToDto(story)).collect(Collectors.toList());
    }

    @Override
    public Page<GetStoryDto> getStoriesForAdmin(String keyword, String orderBy, boolean asc, int page, int itemsPerPage) {

        Pageable pageable =  PageRequest.of(page - 1, itemsPerPage);
        Page<Story> page1 = null;
        if(orderBy.equals("avg_rate")){
            if(asc){
                page1 = storyRepository.findForAdminOrderByAvgRateASC(keyword, pageable);
            } else {
                page1 = storyRepository.findForAdminOrderByAvgRateDESC(keyword, pageable);
            }
        } else if(orderBy.equals("comment")){
            if(asc){
                page1 = storyRepository.findForAdminOrderByNumOfCommentASC(keyword, pageable);
            } else {
                page1 = storyRepository.findForAdminOrderByNumOfCommentDESC(keyword, pageable);
            }
        } else if(orderBy.equals("rating")){
            if(asc){
                page1 = storyRepository.findForAdminOrderByNumOfRatingASC(keyword, pageable);
            } else {
                page1 = storyRepository.findForAdminOrderByNumOfRatingDESC(keyword, pageable);
            }
        } else if(orderBy.equals("screen")){
            if(asc){
                page1 = storyRepository.findForAdminOrderByNumOfScreenASC(keyword, pageable);
            } else {
                page1 = storyRepository.findForAdminOrderByNumOfScreenDESC(keyword, pageable);
            }
        } else if(orderBy.equals("read")){
            if(asc){
                page1 = storyRepository.findForAdminOrderByNumOfReadASC(keyword, pageable);
            } else {
                page1 = storyRepository.findForAdminOrderByNumOfReadDESC(keyword, pageable);
            }
        }
        if(page1 == null) return null;

        Page<GetStoryDto> page2 = page1.map(new Function<Story, GetStoryDto>() {
            @Override
            public GetStoryDto apply(Story story) {
                List<Tag> tagList = tagRepository.findAllByStoryId(story.getId());
                GetStoryDto dto = modelMapper.map(story, GetStoryDto.class);
                dto.setTags(tagService.mapModelToDto(tagList));
                dto.setNumOfComment(commentRepository.countCommentByStoryId(story.getId()));
                dto.setNumOfRate(ratingRepository.countRatingByStoryId(story.getId()));
                return dto;
            }
        });
        return page2;
    }

    @Override
    public ResultDto updateByAdmin(int storyId, boolean disable) {
        ResultDto result = new ResultDto();
        Story story = storyRepository.findById(storyId).orElse(null);
        if(story == null) {
            result.getErrors().put("NOT_FOUND", "Không tìm thấy truyện này");
            result.setSuccess(false);
        } else {
            if(!story.getDeactiveByAdmin() && disable){
                story.setDeactiveByAdmin(true);
            } else if(story.getDeactiveByAdmin() && !disable) {
                story.setDeactiveByAdmin(false);
            }
            storyRepository.save(story);
            result.setSuccess(true);
            result.setData(story);
        }
        return result;
    }

    List<Integer> getRandomTags(int quantity){
        List<Tag> tagsList = tagRepository.findAll();
        int length = tagsList.size();
        List<Tag> list = new ArrayList<>();
        List<Integer> indexes = new ArrayList<>();
        for(int i = 1; i <= quantity; i++){
            int index = new Random().nextInt(length);
            if(indexes.contains(index)) continue;
            indexes.add(index);
            list.add(tagsList.get(index));
        }
        return list.stream().map(t -> t.getId()).collect(Collectors.toList());
    }



}
