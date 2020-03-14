package com.storyart.commentservice.service;

import com.storyart.commentservice.dto.comment.ResponseListCommentDTO;
import com.storyart.commentservice.dto.report.ReportCommentRequestDTO;
import com.storyart.commentservice.dto.report.ReportCommentResponseDTO;
import com.storyart.commentservice.model.Comment;
import com.storyart.commentservice.model.Report;
import com.storyart.commentservice.model.User;
import com.storyart.commentservice.repository.CommentRepository;
import com.storyart.commentservice.repository.ReportRepository;
import com.storyart.commentservice.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    ReportRepository reportRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CommentRepository commentRepository;

    @Override
    public void reportComment(ReportCommentRequestDTO reportCommentRequestDTO) {
        if(reportCommentRequestDTO.getContent().length()<1){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Vui lòng không để trống nội dung report.");
        }
        Optional<Report> rp = reportRepository.findReportByUserIdAndCommentId(reportCommentRequestDTO.getUserId(), reportCommentRequestDTO.getCommentId());
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
        //find user
        Optional<User> u = userRepository.findById(reportCommentRequestDTO.getUserId());
        if (!u.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Tài khoản không tồn tại.");
        }

        //find cmt
        Optional<Comment> cmt = commentRepository.findById(reportCommentRequestDTO.getCommentId());
        if (!cmt.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Bình luận không tồn tại.");
        }

        Report report = new Report();
        report.setComment(cmt.get());
        report.setUser(u.get()); //user nay la nguoi di report dung ko, dung r, user bi, report nam trong cmt
        //chinh xac =)))
        //lua` nhau a` :v
        //tuong ko biet cai nay chu =)) :))
        report.setContent(reportCommentRequestDTO.getContent());
        report.setHandled(false);//handle cho nay de lam gi v anh //them vao` de admin moi lan giai quyet
        //kieu nhu isDisableByAdmin ha
        //dung, nhung ma` se co case admin k disable,
        //để mình biết cái report nào admin đã xử lí rồi, tránh load hết.
        //a ok anh, v la co them 1 bien isDisableByAdmin trong comment dung ko , đúng, 1 cái ishandled trong report
        //ok, gud gud

        reportRepository.save(report);
    }

    @Override
    public Page<ReportCommentResponseDTO> getListReportComment(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Report> reportPage = reportRepository.findReportComment(pageable);

        Page<ReportCommentResponseDTO> responsePage = reportPage.map(new Function<Report, ReportCommentResponseDTO>() {
            @Override
            public ReportCommentResponseDTO apply(Report report) {
                ModelMapper mm = new ModelMapper();
                ReportCommentResponseDTO reportCommentResponseDTO = mm.map(report, ReportCommentResponseDTO.class);
                return reportCommentResponseDTO;
            }
        });

        List<Report> reportList = reportPage.getContent();
        List<Integer> commentIds = new ArrayList<>();

        for (Report report : reportList) {
            commentIds.add(report.getComment().getId());
        }

        List<Integer> numberOfReports = reportRepository.getNumberOfReports(commentIds);
        List<ReportCommentResponseDTO> responseList = responsePage.getContent();
        int index = 0;
        for (ReportCommentResponseDTO response: responseList) {
            response.setNumberOfReports(numberOfReports.get(index));
            response.setCommentOwner(reportList.get(index).getComment().getUser().getUsername());
            index++;
        }

        return responsePage;
    }
}
