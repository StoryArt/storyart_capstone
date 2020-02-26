package com.storyart.commentservice.model;

import com.storyart.commentservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "report")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Report extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int userId;
    private int storyid;
    private int commentId;
    private String content;
}
