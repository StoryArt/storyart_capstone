package com.storyart.userservice.common;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class DateAudit {
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
