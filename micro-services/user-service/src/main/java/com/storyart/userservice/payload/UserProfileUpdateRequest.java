package com.storyart.userservice.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileUpdateRequest {




    @NotBlank
    String gender;
    @NotBlank
    @Size(min = 4, max = 40)
    String name;
    @NotBlank
    @Size(max = 40)
    @NaturalId
    String email;

    @Size(min = 0, max = 200)
    String intro_content;

    @NotBlank
    String dob;



}
