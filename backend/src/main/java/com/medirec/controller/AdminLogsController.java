package com.medirec.controller;

import com.medirec.dto.LogEntryDto;
import com.medirec.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/logs")
public class AdminLogsController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<LogEntryDto>> getLogs() {
        return ResponseEntity.ok(adminService.getLogs());
    }
} 