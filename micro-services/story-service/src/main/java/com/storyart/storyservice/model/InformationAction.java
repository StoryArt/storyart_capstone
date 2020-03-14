package com.storyart.storyservice.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
    @NotNull
    private String actionId;

    @Id
    @NotNull
    private String informationId;

    @NotBlank
    private String value;

    @NotBlank
    private String operation;
}

@Setter
@Getter
@NoArgsConstructor
class InformationActionId implements Serializable{
    private String actionId;
    private String informationId;
}
