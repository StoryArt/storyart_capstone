package com.storyart.storyservice.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "story")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    private String title;

    private int authorId;

    private String intro;

    private String animation;
    private String image;

    private String firstScreenId;

    @Column(columnDefinition = "float default 0")
    private float avgRate;

    @ColumnDefault("true")
    private boolean isActive;

    @ColumnDefault("false")
    private boolean isPublished;


    @ColumnDefault("false")
    private Boolean isDeactiveByAdmin;

    @ManyToMany
    @JoinTable(
            name = "story_tag",
            joinColumns = @JoinColumn(name = "story_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    List<Tag> tags;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
