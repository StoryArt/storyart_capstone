package com.storyart.storyservice.dto;

import com.storyart.storyservice.model.Section;
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
public class AddStoryDto implements Serializable {
    private Integer id;
    private String title;
    private int authorId;
    private String introContent;
    private String animation;
    private boolean isActive;
    private boolean isParametered;
    private String parameterName;
    private int totalParameterPoints;
    private int minParameterPoints;
    private float avgRate;

    private List<Section> sections;
}
