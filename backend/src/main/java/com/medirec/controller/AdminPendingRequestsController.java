package com.medirec.controller;

import com.medirec.dto.SignupRequestDto;
import com.medirec.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/pending-requests")
public class AdminPendingRequestsController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<SignupRequestDto>> getPendingRequests() {
        List<SignupRequestDto> list = adminService.getPendingRequests();
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{uuid}/approve")
    public ResponseEntity<Map<String, String>> approveRequest(@PathVariable UUID uuid) {
        String msg = adminService.approvePendingRequest(uuid);
        return ResponseEntity.ok(Map.of("message", msg));
    }
} 