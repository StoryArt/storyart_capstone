package com.storyart.commentservice.dto.comment;


import com.storyart.commentservice.model.Comment;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class ResponseCommentFromEntityDTO {
    private Integer id;
    private int userId;
    private int storyId;
    private String content;
    private boolean isActive;
    private boolean isDisableByAdmin;
    private Timestamp createAt;
    private Timestamp updateAt;
    private List<Integer> likes;
    private List<Integer> dislikes;

    public ResponseCommentFromEntityDTO(Comment comment, List<Integer> likes, List<Integer> dislikes) {
        this.id = comment.getId();
        this.userId = comment.getUserId();
        this.storyId = comment.getStoryId();
        this.content = comment.getContent();
        this.isActive = comment.isActive();
        this.isDisableByAdmin = comment.isDisableByAdmin();
        this.createAt = comment.getCreateAt();
        this.updateAt = comment.getUpdateAt();
        this.likes = likes;
        this.dislikes = dislikes;
    }
}
