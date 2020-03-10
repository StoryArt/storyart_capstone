package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "reading_history")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ReadingHistoryId.class)
public class ReadingHistory extends DateAudit implements Serializable {

    @Id
    private Integer userId;

    @Id
    private Integer storyId ;

    private String listSectionId;
}
