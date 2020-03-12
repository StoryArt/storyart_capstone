package com.storyart.storyservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "information_action")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(InformationActionId.class)
public class InformationAction {
    @Id
    @Column(length = 100)
    private String actionId;

    @Id
    @Column(length = 100)
    private String informationId;

    private String value;
    private String operation;
}

@Setter
@Getter
@NoArgsConstructor
class InformationActionId implements Serializable{
    private String actionId;
    private String informationId;
}
