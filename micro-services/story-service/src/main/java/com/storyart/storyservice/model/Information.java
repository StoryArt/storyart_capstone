package com.storyart.storyservice.model;

import com.storyart.storyservice.common.constants.PARAMETER_TYPES;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "information")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Information implements Serializable {
    @Id
    @Column(length = 100)
    private String id;

    private int storyId;
    private String name;
    private String value;
    private String unit;

    @Enumerated(EnumType.STRING)
    private PARAMETER_TYPES type;

}
