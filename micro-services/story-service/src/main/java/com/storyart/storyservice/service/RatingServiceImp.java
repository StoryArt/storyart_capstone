package com.storyart.storyservice.service;

import com.storyart.storyservice.model.RatedStoryDTO;
import com.storyart.storyservice.model.RatingDTO;
import com.storyart.storyservice.model.Rating;
import com.storyart.storyservice.model.Story;
import com.storyart.storyservice.repository.RatingRepository;
import com.storyart.storyservice.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RatingServiceImp implements RatingService {


    @Autowired
    StoryRepository storyRepository;

    @Autowired
    RatingRepository ratingRepository;

    @Override
    public List<Story> getSuggestion(Integer id) {

        // Step 1
        // find All User Rating
        List<Integer> listStory = storyRepository.findAllStory();

        List<RatedStoryDTO> ListAssumRatedStory = new ArrayList<>();


        for (Integer story : listStory) {
            List<RatingDTO> listRatingUser = new ArrayList<>();
            List<Rating> ratingUser = ratingRepository.findRatingByStoryIdEXceptId(story, id);

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

            currUser.setListPoint(listCurrRated);


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
                for (RatedStoryDTO user : currUser.getListPoint()) {
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

        List<Story> NewListStory = new ArrayList<>();
        for (Integer storyid : listSuggestStory){

            Story dtoStory = storyRepository.findStoryById(storyid);
            NewListStory.add(dtoStory);
        }

        return NewListStory;
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


}
