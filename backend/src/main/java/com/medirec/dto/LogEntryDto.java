package com.medirec.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class LogEntryDto {
    private UUID uuid;
    private String action;
    private LocalDateTime timestamp;

    public LogEntryDto() {}

    public LogEntryDto(UUID uuid, String action, LocalDateTime timestamp) {
        this.uuid = uuid;
        this.action = action;
        this.timestamp = timestamp;
    }

    public UUID getUuid() { return uuid; }
    public void setUuid(UUID uuid) { this.uuid = uuid; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
} 