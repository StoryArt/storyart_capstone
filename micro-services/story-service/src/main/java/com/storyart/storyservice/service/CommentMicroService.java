package com.storyart.storyservice.service;

import com.storyart.storyservice.dto.statistic.StatisticResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;

@FeignClient(name="comment-service")
public interface CommentMicroService {
    @GetMapping(value = "/api/v1/comment/public/getCommentStatistic")
    StatisticResponse getCommentListResponce(@RequestParam(defaultValue = "0") @Valid Integer storyId,
                                             @RequestParam(defaultValue = "0") @Valid Integer userId,
                                             @RequestParam(defaultValue = "0") @Valid String start,
                                             @RequestParam(defaultValue = "0") @Valid String end);

}




//class CommentServiceImpl implements  CommentService{
//
//    @Override
//    public StatisticResponse getCommentListResponce(@Valid Integer userId, @Valid String start, @Valid String end) {
//
//    }
//}



