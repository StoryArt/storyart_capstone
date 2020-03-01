package com.storyart.userservice.model;

import com.storyart.userservice.model.audit.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
//@Table(name = "story")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Story extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private int authorId;
    private String introContent;
    private String animation;
    private boolean isActive;
    private boolean isParametered;
    private String parameterName;
    private int totalParameterPoints;
    private float avgRate;
}
