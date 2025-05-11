package com.medirec.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class SignupRequestDto {
    private UUID uuid;
    private String name;
    private String email;
    private String role;
    private String status;
    private LocalDateTime requestedAt;

    public SignupRequestDto() {}

    public SignupRequestDto(UUID uuid, String name, String email, String role, String status, LocalDateTime requestedAt) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.role = role;
        this.status = status;
        this.requestedAt = requestedAt;
    }

    public UUID getUuid() { return uuid; }
    public void setUuid(UUID uuid) { this.uuid = uuid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getRequestedAt() { return requestedAt; }
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }
} 