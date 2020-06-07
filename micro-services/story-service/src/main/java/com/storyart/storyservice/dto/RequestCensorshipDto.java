package com.storyart.storyservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestCensorshipDto {
    private int storyId;

    @Size(max = 1000, message = "Ghi chú không quá 1000 kí tự")
    private String userNote;
}
