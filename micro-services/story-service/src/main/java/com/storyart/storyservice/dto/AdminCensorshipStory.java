package com.storyart.storyservice.dto;

import com.storyart.storyservice.dto.read_story.ReadStoryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminCensorshipStory {
    private ReadStoryDto oldStory;
    private ReadStoryDto currentStory;
}
