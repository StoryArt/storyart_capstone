package com.storyart.storyservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
