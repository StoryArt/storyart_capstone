package com.storyart.commentservice.model;

import com.storyart.commentservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "reaction")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ReactionId.class)
public class Reaction implements Serializable {
    @Id
    private int userId;
    @OneToOne
    @JoinColumn
    private Comment comment;

    private String type;

    @CreationTimestamp
    private Timestamp createAt;
    @UpdateTimestamp
    private Timestamp updateAt;
}
