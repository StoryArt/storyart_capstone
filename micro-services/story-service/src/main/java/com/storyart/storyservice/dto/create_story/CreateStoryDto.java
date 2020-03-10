package com.storyart.storyservice.dto;

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
class CreateStoryActionDto{
    private String id;
    private String content;
    private String type;
    private String operation;
    private String value;
    private String nextScreenId;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class CreateStoryScreenDto{
    private String id;
    private String title;
    private String content;
    private String nextScreenId;
    List<CreateStoryActionDto> actions;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class CreateStoryConditionDto{
    private String id;
    private String type; //<, >

    private String value;
    private String nextScreenId;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class CreateStoryInformationDto{
    private String id;
    private String type; //NUMBER
    private String name;
    private String value;
    List<CreateStoryConditionDto> conditions;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddStoryDto implements Serializable {
    private Integer id;
    private String title;
    private int authorId;
    private String introContent;
    private String animation;
    private boolean isPublished;

    private List<CreateStoryScreenDto> sections;
    private List<CreateStoryInformationDto> informations;
}
