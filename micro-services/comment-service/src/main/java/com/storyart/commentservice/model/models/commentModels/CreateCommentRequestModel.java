package com.storyart.commentservice.model.models.commentModels;

import org.springframework.web.bind.annotation.RequestBody;

public class CreateCommentRequestModel {
    public String content;
    public int userId;
    public int storyId;

    public CreateCommentRequestModel(String content, int userId, int storyId) {
        this.content = content;
        this.userId = userId;
        this.storyId = storyId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getStoryId() {
        return storyId;
    }

    public void setStoryId(int storyId) {
        this.storyId = storyId;
    }
}
