package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import com.storyart.storyservice.common.constants.PARAMETER_TYPES;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "information")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Information extends DateAudit {
    @Id
    @Column(length = 100)
    private String id;

    private int storyId;

    @NotBlank(message = "Tên thông tin không được đê trống")
    private String name;

    @NotBlank(message = "Giá trị thông tin không được trống")
    private String value;

    private String unit;

    @Enumerated(EnumType.STRING)
    private PARAMETER_TYPES type;

}
