package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.*;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "story")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Story extends DateAudit implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    private String title;

    @NonNull
    private int authorId;

    @NonNull
    private String introContent;

    @NonNull
    private String animation;
    private boolean isActive;
    private boolean isParametered;
    private String parameterName;
    private int totalParameterPoints;
    private float avgRate;
}
