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
@Table(name = "screen")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Screen implements Serializable{
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(length = 100)
    private String id;
    private int storyId;

    private String title;
    private String content;
    private String nextScreenId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
