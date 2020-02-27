package com.storyart.commentservice.model.models.commentModels;

public class UpdateCommentRequestModel {
    public int userId;
    public int commentId;
    public String content;

    public UpdateCommentRequestModel(int userId, int commentId, String content) {
        this.userId = userId;
        this.commentId = commentId;
        this.content = content;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
