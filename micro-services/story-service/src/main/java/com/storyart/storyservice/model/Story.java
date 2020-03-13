package com.storyart.storyservice.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Range;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Size;

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
    @Column(length = 250)
    @Size(min = 5, max = 250)
    private String title;

    private int authorId;

    @Column(length = 10000)
    @Size(min = 10, max = 10000)
    private String intro;

    @Column(length = 100)
    @Size(max = 100)
    private String animation;

    @Column(length = 1000)
    @Size(max = 1000)
    private String image;

    private String firstScreenId;

    @Column(columnDefinition = "float default 0")
    @Range(min = 0, max = 5)
    private float avgRate;

    @Column(columnDefinition="tinyint(1) default 0")
    private boolean isActive;

    @Column(columnDefinition="tinyint(1) default 0")
    private boolean isPublished;


    @Column(columnDefinition="tinyint(1) default 0")
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
