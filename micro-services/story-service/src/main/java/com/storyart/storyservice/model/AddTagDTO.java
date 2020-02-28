package com.storyart.storyservice.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddTagDTO {
    private Integer id;
    private String title;
    private boolean isActive;
}
