package com.medirec.controller;

import com.medirec.dto.DashboardSummaryDto;
import com.medirec.dto.UserRoleStatsDto;
import com.medirec.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/summary-stats")
    public ResponseEntity<DashboardSummaryDto> getSummaryStats() {
        return ResponseEntity.ok(adminService.getDashboardSummaryStats());
    }

    @GetMapping("/user-role-stats")
    public ResponseEntity<UserRoleStatsDto> getUserRoleStats() {
        return ResponseEntity.ok(adminService.getDashboardUserRoleStats());
    }
} 