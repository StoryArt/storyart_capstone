package com.storyart.userservice.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailForgotPasswordRequest {
@Email(message = "Không đúng dịnh dạng email!")
        @NotBlank(message = "Email không được để trống!")
    String email;
}
