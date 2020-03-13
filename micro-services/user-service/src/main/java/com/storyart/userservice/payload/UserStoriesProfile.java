package com.storyart.userservice.payload;

import com.storyart.userservice.model.Story;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserStoriesProfile {

    private Integer id;
    private String name;
    private String email;
    private Instant jointAt;
    private Instant modifiedAt;
    private  String introContent;
    Date dob;
    List<Story> storyList;



}
