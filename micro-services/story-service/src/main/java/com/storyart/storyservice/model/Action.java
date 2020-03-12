package com.storyart.storyservice.model;

import com.storyart.storyservice.common.constants.ACTION_TYPES;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "action")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Action implements Serializable {
    @Id
    @Column(length = 100)
    private String id;

    @Column(length = 100)
    private String screenId;

    private String content;
    private String nextScreenId;
//    private String operation;//+ - * /
    private String value; // gia tri tac dong

    @Enumerated(EnumType.STRING)
    private ACTION_TYPES type;

}
