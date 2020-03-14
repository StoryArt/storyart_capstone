package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import java.io.Serializable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
class RatingId implements Serializable {
    private int userId;
    private int storyId;
}

@Entity
@Table(name = "rating")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(RatingId.class)
public class Rating extends DateAudit {
    @Id
    @NotBlank
    @Size(max = 255)
    private int userId;

    @Id
    @NotBlank
    @Size(max = 255)
    private int storyId;

    @Range(min=0, max=5)
    private int stars;
}
