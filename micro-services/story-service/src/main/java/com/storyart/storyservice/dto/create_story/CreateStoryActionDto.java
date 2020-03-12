package com.storyart.storyservice.dto.create_story;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateStoryActionDto{
    private String id;
    private String content;
    private String type;
//    private String operation;
    private String value;
    private String nextScreenId;
}
