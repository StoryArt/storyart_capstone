package com.storyart.userservice.payload;

import com.storyart.userservice.model.RoleName;
import com.storyart.userservice.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.Date;


/*show infromation to client to display user profile*/

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private Integer id;
    private String username;
    private String name;
    private String email;
    private Date jointAt;
    private Integer storyCount;

    private String gender;
    private String intro_content;
    private Instant dob;
    private RoleName role;
//todo: bo username
    //todo: slug
    //todo: them role

    public UserProfileResponse(User user) {
        this.setId(user.getId());
        this.setName(user.getName());
        this.setUsername(user.getUsername());
        this.setEmail(user.getEmail());
        this.setJointAt(user.getCreatedAt());
        this.setIntro_content(user.getIntroContent());

        this.role=(user.getRole().getName());

    }


    public Instant stringToInstant(String timestamp, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);

        TemporalAccessor temporalAccessor = formatter.parse(timestamp);
        LocalDateTime localDateTime = LocalDateTime.from(temporalAccessor);
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.systemDefault());
        return Instant.from(zonedDateTime);
    }
}