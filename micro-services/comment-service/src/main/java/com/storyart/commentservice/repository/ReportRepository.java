package com.storyart.commentservice.repository;

import com.storyart.commentservice.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    @Query("select r from Report r where r.userId = ?1 and r.commentId = ?2")
    Optional<Report> findReportByUserIdAndCommentId(int userId, int commentId);
}
