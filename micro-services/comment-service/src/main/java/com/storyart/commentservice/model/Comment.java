package com.storyart.commentservice.model;

import com.storyart.commentservice.common.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "comment")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private int userId;
    private int storyId;
    private String content;
    private boolean isActive;
    private boolean isDisableByAdmin;
    @CreationTimestamp
    private Timestamp createAt;
    @UpdateTimestamp
    private Timestamp updateAt;

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isDisableByAdmin() {
        return isDisableByAdmin;
    }

    public void setDisableByAdmin(boolean disableByAdmin) {
        isDisableByAdmin = disableByAdmin;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

    public Timestamp getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Timestamp updateAt) {
        this.updateAt = updateAt;
    }
}
