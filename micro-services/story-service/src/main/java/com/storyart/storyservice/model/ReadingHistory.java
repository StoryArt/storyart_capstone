package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "reading_history")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReadingHistory extends DateAudit {
    @Id
    private int userId;

    @Id
    private int storyId;

    private String listSectionId;
}
