package com.storyart.storyservice.dto.create_story;

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
public class CreateStoryActionDto{
    @NotBlank(message = "Chưa có id cho hành động")
    private String id;

    @NotBlank(message = "Chưa có nội dung cho hành động")
    @Size(max = 255, message = "Nội dung hành động có tối đa 255 kí tự")
    private String content;

    @Pattern(regexp = "UPDATE_INFORMATION|NEXT_SCREEN|REDIRECT", message = "Kiểu hành động chỉ 1 trong UPDATE_INFORMATION|NEXT_SCREEN|REDIRECT")
    private String type;

    private String value;
    private String nextScreenId;
}
