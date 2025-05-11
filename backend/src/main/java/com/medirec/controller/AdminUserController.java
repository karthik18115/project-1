package com.medirec.controller;

import com.medirec.dto.UserDto;
import com.medirec.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<UserDto> getUser(@PathVariable UUID uuid) {
        return ResponseEntity.ok(adminService.getUser(uuid));
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto dto) {
        return ResponseEntity.ok(adminService.createUser(dto));
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<UserDto> updateUser(@PathVariable UUID uuid, @RequestBody UserDto dto) {
        return ResponseEntity.ok(adminService.updateUser(uuid, dto));
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID uuid) {
        adminService.deleteUser(uuid);
        return ResponseEntity.noContent().build();
    }
} 