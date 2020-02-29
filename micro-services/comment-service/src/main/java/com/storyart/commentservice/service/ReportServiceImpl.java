package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.report.ReportCommentDTO;
import com.storyart.commentservice.model.Report;
import com.storyart.commentservice.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    ReportRepository reportRepository;

    @Override
    public void reportComment(ReportCommentDTO reportCommentDTO) {
        List<Report> reports = reportRepository.findAll();
        for (Report report: reports) {
            if(report.getUserId() == reportCommentDTO.getUserId() && report.getCommentId() == reportCommentDTO.getCommentId()){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"This comment have been reported recently.");
            }
        }


        Report report = new Report();
        report.setCommentId(reportCommentDTO.getCommentId());
        report.setUserId(reportCommentDTO.getUserId());
        report.setContent(reportCommentDTO.getContent());
        report.setHandled(false);

        reportRepository.save(report);
    }
}
