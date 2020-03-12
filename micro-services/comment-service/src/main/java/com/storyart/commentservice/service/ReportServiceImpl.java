package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.report.ReportCommentDTO;
import com.storyart.commentservice.model.Report;
import com.storyart.commentservice.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    ReportRepository reportRepository;

    @Override
    public void reportComment(ReportCommentDTO reportCommentDTO) {
        Optional<Report> rp = reportRepository.findReportByUserIdAndCommentId(reportCommentDTO.getUserId(), reportCommentDTO.getCommentId());
        //List<Report> reports = reportRepository.findAll();//lay het report trong db ra luon ha anh :v de a sua, nay` luc a chua biet query
        //ok anh
        //for (Report report: reports) {
        //    if(report.getUserId() == reportCommentDTO.getUserId() && report.getCommentId() == reportCommentDTO.getCommentId()){
        //        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"This comment have been reported recently.");
        //    }
        //}
        if (rp.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Bạn đã báo cáo bình luận này.");
        }


        Report report = new Report();
        report.setCommentId(reportCommentDTO.getCommentId());
        report.setUserId(reportCommentDTO.getUserId()); //user nay la nguoi di report dung ko, dung r, user bi, report nam trong cmt
        //chinh xac =)))
        //lua` nhau a` :v
        //tuong ko biet cai nay chu =)) :))
        report.setContent(reportCommentDTO.getContent());
        report.setHandled(false);//handle cho nay de lam gi v anh //them vao` de admin moi lan giai quyet
        //kieu nhu isDisableByAdmin ha
        //dung, nhung ma` se co case admin k disable,
        //để mình biết cái report nào admin đã xử lí rồi, tránh load hết.
        //a ok anh, v la co them 1 bien isDisableByAdmin trong comment dung ko , đúng, 1 cái ishandled trong report
        //ok, gud gud

        reportRepository.save(report);
    }
}
