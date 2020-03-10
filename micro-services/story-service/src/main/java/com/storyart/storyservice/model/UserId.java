package com.storyart.storyservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserId implements Serializable {


    @Column(name = "user_id")
    private long userId;

    @Column(name = "story_id")
    private long storyId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserId)) return false;
        UserId userId1 = (UserId) o;
        return userId == userId1.userId &&
                storyId == userId1.storyId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, storyId);
    }


}