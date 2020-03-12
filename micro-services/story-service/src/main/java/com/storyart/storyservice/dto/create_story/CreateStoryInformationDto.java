package com.storyart.storyservice.dto.create_story;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateStoryInformationDto{
    private String id;
    private int storyId;
    private String type; //NUMBER
    private String name;
    private String value;
    List<CreateStoryConditionDto> conditions;
}
