package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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
}
