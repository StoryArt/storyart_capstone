package com.storyart.commentservice.model;

import com.storyart.commentservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "reaction")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Reaction extends DateAudit {
    @Id
    private int userId;
    @Id
    private int commentId;

    private String type;

    //@CreationTimestamp
    //private Timestamp createAt;
    //@UpdateTimestamp
    //private Timestamp updateAt;
}
