package com.medirec.dto;

public class LoginResponse {
    private String token;
    private String role;
    private String uuid;
    private String fullName;
    private String email;

    public LoginResponse(String token, String role, String uuid, String fullName, String email) {
        this.token = token;
        this.role = role;
        this.uuid = uuid;
        this.fullName = fullName;
        this.email = email;
    }

    // Getters and setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getUuid() { return uuid; }
    public void setUuid(String uuid) { this.uuid = uuid; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
} 