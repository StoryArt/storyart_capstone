package com.storyart.userservice.model;

import com.storyart.userservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
