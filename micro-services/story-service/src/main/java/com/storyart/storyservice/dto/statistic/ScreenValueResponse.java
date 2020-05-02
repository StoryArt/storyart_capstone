package com.storyart.storyservice.dto.statistic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScreenValueResponse {
    String id;
    private String title;
    long sumtime;
    long viewcount;
    double timeperview;
}
