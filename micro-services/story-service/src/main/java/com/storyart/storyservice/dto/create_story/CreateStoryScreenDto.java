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
public class CreateStoryScreenDto{
    private String id;
    private int storyId;
    private String title;
    private String content;
    private String nextScreenId;
    List<CreateStoryActionDto> actions;
}
