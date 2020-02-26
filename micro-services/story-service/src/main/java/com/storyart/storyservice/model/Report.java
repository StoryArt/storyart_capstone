package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "report")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Report extends DateAudit implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int userId;
    private int storyid;
    private int commentId;
    private String content;
}
