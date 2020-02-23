package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "rating")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Rating extends DateAudit {
    @Id
    private int userId;
    @Id
    private int storyId;

    private int stars;
}
