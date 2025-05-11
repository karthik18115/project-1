package com.medirec.controller;

import com.medirec.dto.DoctorPanelDto;
import com.medirec.dto.EmergencyPanelDto;
import com.medirec.dto.LabPanelDto;
import com.medirec.dto.PharmacyPanelDto;
import com.medirec.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminPanelsController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/doctor-panel")
    public ResponseEntity<DoctorPanelDto> getDoctorPanel() {
        return ResponseEntity.ok(adminService.getDoctorPanel());
    }

    @GetMapping("/emergency-panel")
    public ResponseEntity<EmergencyPanelDto> getEmergencyPanel() {
        return ResponseEntity.ok(adminService.getEmergencyPanel());
    }

    @GetMapping("/lab-panel")
    public ResponseEntity<LabPanelDto> getLabPanel() {
        return ResponseEntity.ok(adminService.getLabPanel());
    }

    @GetMapping("/pharmacy-panel")
    public ResponseEntity<PharmacyPanelDto> getPharmacyPanel() {
        return ResponseEntity.ok(adminService.getPharmacyPanel());
    }
} 