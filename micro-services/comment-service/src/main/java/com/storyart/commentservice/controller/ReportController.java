package com.storyart.commentservice.controller;

import com.storyart.commentservice.dto.report.ReportCommentRequestDTO;
import com.storyart.commentservice.dto.report.ReportCommentResponseDTO;
import com.storyart.commentservice.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/report")
@CrossOrigin(origins = "*")
public class ReportController {
    @Autowired
    ReportService reportService;

    @PostMapping("/reportComment")
    public ResponseEntity<Boolean> reportComment(@RequestBody @Valid ReportCommentRequestDTO reportCommentRequestDTO){
        reportService.reportComment(reportCommentRequestDTO);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }

    @GetMapping("/getCommentReports")
    public Page<ReportCommentResponseDTO> getCommentReports(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize){
        pageNo = pageNo -1;
        if(pageNo<0){
            pageNo = 0;
        }
        return reportService.getListReportComment(pageNo, pageSize);
    }
}
