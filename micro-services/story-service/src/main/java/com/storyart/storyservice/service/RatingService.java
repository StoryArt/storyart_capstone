package com.storyart.storyservice.service;

import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.dto.ResultDto;
import com.storyart.storyservice.dto.story_suggestion.RatedStoryDTO;
import com.storyart.storyservice.dto.story_suggestion.RatingDTO;
import com.storyart.storyservice.dto.story_suggestion.StoryCommentDTO;
import com.storyart.storyservice.model.Rating;
import com.storyart.storyservice.model.RatingId;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.model.Tag;
import com.storyart.storyservice.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.Optional;

public interface RatingService {
    List<Integer>  getSuggestion(Integer id, boolean flag);
    List<Integer> getSuggestByCommentAndReaction();
    ResultDto rateStory(double stars, int  userId, int storyId);
}


@Service
class RatingServiceIml implements RatingService {

    @Autowired
    StoryRepository storyRepository;

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TagService tagService;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public List<Integer>  getSuggestion(Integer id, boolean flagcheck) {

        // Step 1
        // find All User Rating\
        List<Integer> listStory = new ArrayList<>();
        if(flagcheck){
            listStory = storyRepository.findStoryThisWeek();
        }else{
            listStory = storyRepository.findStoryExceptThisWeek();
        }


        List<RatedStoryDTO> ListAssumRatedStory = new ArrayList<>();

        for (Integer story : listStory) {
            List<RatingDTO> listRatingUser = new ArrayList<>();
            List<Rating> ratingUser = ratingRepository.findRatingByStoryIdEXceptId(story, id);

            if(ratingUser.size() >0 ){

                for (Rating rate : ratingUser) {

                    List<Rating> userRating = ratingRepository.findRatingByUserId(rate.getUserId());
                    RatingDTO dtoUSER = new RatingDTO();

                    List<RatedStoryDTO> listRated = new ArrayList<>();
                    double sum = 0.0;
                    // Step 2
                    // Count Normalize Number of selected User
                    for (Rating rateUser : userRating) {
                        sum = sum + rateUser.getStars();

                    }
                    double normalizeNumber = sum / userRating.size();

                    // Step 3
                    // Find Rating of selected User
                    dtoUSER.setUserid(rate.getUserId());

                    for (Integer storyid : listStory) {
                        boolean flag = true;
                        RatedStoryDTO ratedDTO = new RatedStoryDTO();

                        for (Rating rateUser : userRating) {

                            if (storyid.equals(rateUser.getStoryId())) {
                                ratedDTO.setStoryId(rateUser.getStoryId());
                                double userPoint = rateUser.getStars() - normalizeNumber;
                                ratedDTO.setRatedPoint(userPoint);
                                flag = false;
                            }
                        }
                        if(flag){
                            ratedDTO.setStoryId(storyid);
                            double userPoint = 0;
                            ratedDTO.setRatedPoint(userPoint);
                        }
                        listRated.add(ratedDTO);
                    }
                    dtoUSER.setListPoint(listRated);
                    listRatingUser.add(dtoUSER);
                }




                // step 4
                // get Current User
                // count Rating of current User
                RatingDTO currUser = new RatingDTO();
                currUser.setUserid(id);
                List<Rating> currUserRating = ratingRepository.findRatingByUserId(id);
                double sum = 0;
                for (Rating rate : currUserRating) {
                    sum += rate.getStars();
                }
                double normalizeCurrUser = sum / currUserRating.size();

                List<RatedStoryDTO> listCurrRated = new ArrayList<>();
                for (Integer storyid : listStory) {
                    boolean flag = true;
                    RatedStoryDTO ratedDTO = new RatedStoryDTO();
                    for (Rating rate : currUserRating) {
                        if (storyid.equals(rate.getStoryId())) {
                            ratedDTO.setStoryId(rate.getStoryId());
                            double userPoint = rate.getStars() - normalizeCurrUser;
                            ratedDTO.setRatedPoint(userPoint);
                            flag = false;
                        }
                    }
                    if(flag){
                        ratedDTO.setStoryId(storyid);
                        double userPoint = 0;
                        ratedDTO.setRatedPoint(userPoint);
                    }
                    listCurrRated.add(ratedDTO);

                }



                // step 5
                // Calculate Similarity of current User and Selected User
                // Pick top 2
                int MostFitId = 0;
                double MostFit = 0;
                int SecondFitId = 0;
                double SecondFit = 0;
                for (RatingDTO dto : listRatingUser) {
                    List<Double> listRatingSelectedUser = new ArrayList<>();
                    List<Double> listRatingCurrentUser = new ArrayList<>();
                    for (RatedStoryDTO user : dto.getListPoint()) {
                        listRatingSelectedUser.add(user.getRatedPoint());
                    }
                    for (RatedStoryDTO user : listCurrRated) {
                        listRatingCurrentUser.add(user.getRatedPoint());
                    }
                    if (dto.getUserid() == currUser.getUserid()) {

                    } else {
                        double cosine = cosineSimilarity(listRatingCurrentUser, listRatingSelectedUser);
                        if(MostFit == 0){
                            MostFitId = dto.getUserid();
                            MostFit = cosine;
                        }else if (cosine >= MostFit) {
                            SecondFitId = MostFitId;
                            SecondFit = MostFit;
                            MostFitId = dto.getUserid();
                            MostFit = cosine;
                        } else if (cosine >= SecondFit) {
                            SecondFitId = dto.getUserid();
                            SecondFit = cosine;
                        }
                    }
                }
                //Step 6
                // Count Rate Prediction


                double normalizePointMostFit = 0.0;
                double normalizePointSecondFit = 0.0;
                for(RatingDTO dto : listRatingUser){
                    if(dto.getUserid() ==MostFitId ){
                        for(RatedStoryDTO dto2 : dto.getListPoint()){
                            if(dto2.getStoryId() == story){
                                normalizePointMostFit = dto2.getRatedPoint();
                            }
                        }
                    }
                    if(dto.getUserid() ==SecondFitId ){
                        for(RatedStoryDTO dto2 : dto.getListPoint()){
                            if(dto2.getStoryId() == story){
                                normalizePointSecondFit = dto2.getRatedPoint();
                            }
                        }
                    }
                }

                RatedStoryDTO AssumRatedStory = new RatedStoryDTO();
                AssumRatedStory.setStoryId(story);
                Double ra = ((normalizePointMostFit * MostFit) + (normalizePointSecondFit * SecondFit) ) / ((Math.abs(MostFit)) + (Math.abs(SecondFit)));
                Double AssumtionPoint = ra + normalizeCurrUser;
                AssumRatedStory.setRatedPoint(AssumtionPoint);
                ListAssumRatedStory.add(AssumRatedStory);
            }else{
                RatedStoryDTO AssumRatedStory = new RatedStoryDTO();
                AssumRatedStory.setStoryId(story);
                AssumRatedStory.setRatedPoint(0.0);
                ListAssumRatedStory.add(AssumRatedStory);
            }

        }
        // Step 7
        // remove all lesser than 2.5
        List<Integer> listSuggestStory = new ArrayList<>();
        for (RatedStoryDTO dto : ListAssumRatedStory){
            if(dto.getRatedPoint() >= 2.5){
                listSuggestStory.add(dto.getStoryId());
            }
        }

        // Step 8
        // remove all Duplicate with Current User
        List<Integer> listStoryCurrUser = ratingRepository.findStoryRatingById(id);
        listSuggestStory.removeAll(listStoryCurrUser);

        // Step 9
        // get All suggest Story


        return listSuggestStory;
    }

    @Override
    public ResultDto rateStory(double stars, int userId, int storyId) {
        ResultDto result = new ResultDto();
        result.setSuccess(false);
        RatingId ratingId = new RatingId();
        ratingId.setStoryId(storyId);
        ratingId.setUserId(userId);
        Optional<Rating> rating = ratingRepository.findById(ratingId);
        Rating r = rating.orElseGet(null);
        if(r != null){
          r.setStars(stars);
        } else {
            Rating rate = new Rating();
            RatingId id = new RatingId();
            id.setUserId(userId);
            id.setStoryId(storyId);
            rate.setStars(stars);


        }
        return null;
    }

    public Double cosineSimilarity(List<Double> currUser, List<Double> SelectedUser) {

        double AB = 0.0;
        double A = 0.0;
        double B = 0.0;
        for (int i = 0; i < currUser.size(); i++) {
            AB += currUser.get(i) * SelectedUser.get(i);
            A += currUser.get(i) * currUser.get(i);
            B += SelectedUser.get(i) * SelectedUser.get(i);
        }
        double cosineSimilarity = 0.0;

        cosineSimilarity = AB / (Math.sqrt(A) * Math.sqrt(B));
        return cosineSimilarity;
    }

    @Override
    public List<Integer> getSuggestByCommentAndReaction() {

        List<StoryCommentDTO> list = new ArrayList<>();
        List<Integer> listStory = storyRepository.findAllStory();
        for (Integer integer: listStory){
            int comment = commentRepository.countCommentByStoryId(integer);
            int like = commentRepository.countLikeCommentByStoryId(integer);
            int dislike = commentRepository.countDisLikeCommentByStoryId(integer);

            double point = ((comment * 0.4) + (like * 0.3) + (dislike * 0.3))/(comment + like + dislike);
            StoryCommentDTO dto = new StoryCommentDTO();
            dto.setStoryId(integer);
            dto.setPoint(point);
            list.add(dto);
        }


        List<Integer> listSuggestion = new ArrayList<>();
        int topid = 0;
        int secondtopid = 0;
        int thirdtopid = 0;
        int fourtopid = 0;
        double top = 0.0;
        double second = 0.0;
        double third = 0.0;
        double four = 0.0;
        for (StoryCommentDTO dto : list){
            if(dto.getPoint() >= top){
                fourtopid = thirdtopid;
                thirdtopid = secondtopid;
                secondtopid = topid;
                        topid = dto.getStoryId();
            }else if(dto.getPoint() >= second){
                fourtopid = thirdtopid;
                thirdtopid = secondtopid;
                secondtopid = dto.getStoryId();
            }else if(dto.getPoint() >= third){
                fourtopid = thirdtopid;
                thirdtopid = dto.getStoryId();
            } else if(dto.getPoint() >= four){
                four = dto.getStoryId();
            }
        }
        listSuggestion.add(topid);
        listSuggestion.add(secondtopid);
        listSuggestion.add(thirdtopid);
        listSuggestion.add(fourtopid);

        return listSuggestion;
    }
}
