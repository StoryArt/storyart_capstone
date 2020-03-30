package com.storyart.storyservice.model.interactModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "screen_reading_time")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScreenReadingTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    Integer screenId;
    long duration;
    private Date createdAt;


    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }


}
