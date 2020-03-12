package com.storyart.storyservice.dto.create_story;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateStoryDto implements Serializable {
    private String title;
    private int authorId;
    private String intro;
    private String animation;
    private String firstScreenId;
    private boolean isPublished;

    private List<CreateStoryScreenDto> screens;
    private List<CreateStoryInformationDto> informations;
    private List<CreateStoryInformationActionDto> informationActions;
}
