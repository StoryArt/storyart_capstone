package com.storyart.commentservice.controller;

import com.storyart.commentservice.dto.report.ReportCommentDTO;
import com.storyart.commentservice.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<Boolean> reportComment(@RequestBody @Valid ReportCommentDTO reportCommentDTO){
        reportService.reportComment(reportCommentDTO);

        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }
}
