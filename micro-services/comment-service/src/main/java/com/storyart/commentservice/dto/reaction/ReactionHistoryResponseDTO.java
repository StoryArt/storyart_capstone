package com.storyart.commentservice.dto.reaction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReactionHistoryResponseDTO {
    private int reactionId;
    private int userId;
    private int commentId;
    private int commentOwnerId;
    private String commentOwnerName;
    private String storyName;
    private String type;
    private boolean isActive;
    private Timestamp createAt;
    private Timestamp updateAt;
}