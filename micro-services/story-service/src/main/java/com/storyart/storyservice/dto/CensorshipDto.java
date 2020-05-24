package com.storyart.storyservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CensorshipDto {
    @Pattern(regexp = "APPROVED|PENDING|REJECTED", message = "Trạng thái kiểm duyệt chỉ được APPROVED|PENDING|REJECTED")
    private String censorshipStatus;

    @Size(max = 1000, message = "Admin note không được quá 1000 kí tự")
    private String adminNote;
    private int storyId;
}
