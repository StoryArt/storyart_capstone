package com.storyart.storyservice.dto;

import com.storyart.storyservice.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetStoryDto {
    private Integer id;
    private String title;
    private String intro;
    private String image;
    private float avgRate;
    private Date createdAt;
    private Date updatedAt;
    private int authorId;

    List<TagDto> tags;
}
