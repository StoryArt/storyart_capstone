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
public class ResetPasswordRequest {
    @NotBlank(message = "Mật khẩu không được để trống")
    //size 100 is encoded password,, signup request has passord <=15
    @Size(max = 100, min = 8, message = "Mật khẩu phải có từ 8 đến 100 ký tự")
    private String password;

    @NotBlank(message = "Mật khẩu không được để trống")
    //size 100 is encoded password,, signup request has passord <=15
    @Size(max = 100, min = 8, message = "Mật khẩu phải có từ 8 đến 100 ký tự")
    private String repassword;

    @NotBlank(message = "Bạn không có mã xác nhận. Vui lòng gửi lại mail để lấy đường dẫn đặt lại mật khẩu!")
    String token;
}
