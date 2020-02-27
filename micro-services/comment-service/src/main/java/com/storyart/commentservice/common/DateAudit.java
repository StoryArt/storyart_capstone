package com.storyart.commentservice.common;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
public class DateAudit implements Serializable {
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
