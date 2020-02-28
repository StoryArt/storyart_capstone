package com.storyart.userservice.payload;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {

    @NotBlank
    @Size(min = 8, max = 40)
    private String username;
    @NotBlank
    @Size(min = 8, max = 15)
    private String password;
    @NotBlank
    String gender;
}
