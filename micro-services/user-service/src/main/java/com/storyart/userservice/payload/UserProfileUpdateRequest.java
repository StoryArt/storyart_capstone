package com.storyart.userservice.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileUpdateRequest {
    @NotBlank(message = "Tên không được để trống")
    @Size(max = 40, min = 4, message = "Tên phải có từ 3 đến 40 ký tự")
    private String name;
    @Email
    @NotBlank(message = "Email không được để trống")
    @NaturalId
    String email;
    @Size(max = 300, message = "Thông tin giới thiệu có độ dài tối đa là 300 ký tự")
    String intro_content;
}
