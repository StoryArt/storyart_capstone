package com.storyart.storyservice.dto;

import com.storyart.storyservice.common.constants.CensorshipStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminHandleCensorshipDto {
    private int storyId;

    @Size(max = 1000, message = "Ghi chú không quá 1000 kí tự")
    private String adminNote;

    @Pattern(regexp = "REJECTED|APPROVED", message = "Chỉ được chọn 1 trong các trạng thái REJECTED|APPROVED")
    @NotBlank(message = "Trạng thái kiểm duyệt không được để trống")
    private String censorshipStatus;
}
