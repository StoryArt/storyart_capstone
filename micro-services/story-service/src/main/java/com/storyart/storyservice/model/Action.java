package com.storyart.storyservice.model;

import com.storyart.storyservice.common.DateAudit;
import com.storyart.storyservice.common.constants.ACTION_TYPES;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "action")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Action extends DateAudit {
    @Id
    @Size(max = 255)
    private String id;

    @Size(max = 255)
    private String screenId;

    @Size(max = 10000)
    @Column(length = 10000)
    @NotBlank(message = "Nội dung hành động không được để trống")
    private String content;

    @Size(max = 255)
    private String nextScreenId;
//    private String operation;//+ - * /

    @NotBlank
    @Size(max = 255, message = "Chưa có giá trị tác động")
    private String value; // gia tri tac dong

    @Enumerated(EnumType.STRING)
    private ACTION_TYPES type;

}
