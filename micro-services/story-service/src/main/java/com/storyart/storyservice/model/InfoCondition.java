package com.storyart.storyservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "info_condition")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InfoCondition {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length = 100)
    private String id;

    @Column(length = 100)
    private String informationId;
    private String type; // >, <, =, >=, <=
    private String value;
    private String nextScreenId;
}
