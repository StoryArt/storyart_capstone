package com.storyart.storyservice.dto.statistic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScreenTimeResponse {
    String id;
    private int storyId;

    //tu oktu nha,
    //id cua story la int, id cua screen la string nhoakok
    private String title;

    private String content;



    long sumtime;


}
