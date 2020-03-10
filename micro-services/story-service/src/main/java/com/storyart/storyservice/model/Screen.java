package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "section")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Section implements Serializable{
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String title;
    private int storyId;
    private String content;
    private int parameterPoint;
    private boolean isEndSection;
    private String parentSectionId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
