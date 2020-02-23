package com.storyart.userservice.model;

import com.storyart.userservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
//@Table(name = "section")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Section extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String title;
    private int storyId;
    private String content;
    private int parameterPoint;
    private boolean isEndSection;
    private int parentSectionId;

}
