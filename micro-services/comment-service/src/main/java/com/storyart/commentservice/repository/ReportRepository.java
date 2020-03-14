package com.storyart.commentservice.repository;

import com.storyart.commentservice.dto.report.ReportCommentResponseDTO;
import com.storyart.commentservice.model.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    @Query("select r from Report r where r.user.id = ?1 and r.comment.id = ?2")
    Optional<Report> findReportByUserIdAndCommentId(int userId, int commentId);

    @Query("select r from Report r where r.story.id is null group by r.comment.id order by count(r.comment.id) desc ")
    Page<Report> findReportComment(Pageable pageable);
    @Query("select count(r.comment.id) from Report r where r.comment.id in (:commentIds) group by r.comment.id order by count(r.comment.id) desc")
    List<Integer> getNumberOfReports(List<Integer> commentIds);
}
