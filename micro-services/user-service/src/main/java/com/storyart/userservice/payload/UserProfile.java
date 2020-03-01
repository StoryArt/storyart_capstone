package com.storyart.userservice.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;


/*show infromation to client to display user profile*/

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    private Integer id;
    private String username;
    private String name;
    private String email;
    private Instant joinAt;


    private Integer storyCount;


}
