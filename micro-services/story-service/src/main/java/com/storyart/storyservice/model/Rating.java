package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Range;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

import javax.persistence.*;


@Entity
@Table(name = "rating")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(Rating.class)
public class Rating extends DateAudit {
    @Id
    private int userId;

    @Id
    private int storyId;

    @Range(min=0, max=5)
    private double stars;

    private Date createdAt;

    private Date updatedAt = new Date();

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}
