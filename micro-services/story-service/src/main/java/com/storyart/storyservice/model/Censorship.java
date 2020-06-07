package com.storyart.storyservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "censorship")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Censorship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int storyId;
    private String userNote;
    private String adminNote;
    private String censorshipStatus;
    private Date createdAt;
    private Date handledAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

}
