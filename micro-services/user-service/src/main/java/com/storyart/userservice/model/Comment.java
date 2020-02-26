package com.storyart.userservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "comment")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private int userId;
    private int storyId;
    private String content;
}
