package com.storyart.commentservice.dto.comment;


import com.storyart.commentservice.model.Comment;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
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
    private int numberOfLike;
    private int numberOfDislike;
    private boolean amILikeThisComment;
    private boolean amIDislikeThisComment;

    public ResponseCommentFromEntityDTO(Comment comment, int numberOfLike, int numberOfDislike, boolean amIDislikeThisComment, boolean amILikeThisComment) {
        this.id = comment.getId();
        this.userId = comment.getUserId();
        this.storyId = comment.getStoryId();
        this.content = comment.getContent();
        this.isActive = comment.isActive();
        this.isDisableByAdmin = comment.isDisableByAdmin();
        this.createAt = comment.getCreateAt();
        this.updateAt = comment.getUpdateAt();
        this.numberOfLike = numberOfLike;
        this.numberOfDislike = numberOfDislike;
        this.amILikeThisComment = amILikeThisComment;
        this.amIDislikeThisComment = amIDislikeThisComment;
    }
}
