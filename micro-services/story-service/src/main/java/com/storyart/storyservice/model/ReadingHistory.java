package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
class ReadingHistoryId implements Serializable {
    private int userId;
    private int storyId;
}


@Entity
@Table(name = "reading_history")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ReadingHistoryId.class)
public class ReadingHistory extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private Integer userId;

    @NotNull
    private Integer storyId;

    private String listSectionId;
}
