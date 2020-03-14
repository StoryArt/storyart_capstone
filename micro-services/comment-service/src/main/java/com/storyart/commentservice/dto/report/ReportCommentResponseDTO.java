package com.storyart.commentservice.dto.report;

import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.model.Story;
import com.storyart.commentservice.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportCommentResponseDTO {
    private int id;

    private int numberOfReports;

    private int commentId;
    private String commentContent;
    private String commentOwner;

    private boolean isHandled;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
