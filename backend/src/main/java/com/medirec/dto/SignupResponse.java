package com.medirec.dto;

public class SignupResponse {
    private String uuid;
    private String message;

    public SignupResponse(String uuid, String message) {
        this.uuid = uuid;
        this.message = message;
    }

    // Getters and setters
    public String getUuid() { return uuid; }
    public void setUuid(String uuid) { this.uuid = uuid; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
} 