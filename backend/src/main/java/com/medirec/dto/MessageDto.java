package com.medirec.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class MessageDto {
    private UUID id;
    private UUID senderId;
    private String senderName;
    private UUID recipientId;
    // private String recipientName; // Optional, may not be needed if context is clear
    private String content;
    private LocalDateTime timestamp;
    private boolean isRead;

    public MessageDto() {}

    public MessageDto(UUID id, UUID senderId, String senderName, UUID recipientId, String content, LocalDateTime timestamp, boolean isRead) {
        this.id = id;
        this.senderId = senderId;
        this.senderName = senderName;
        this.recipientId = recipientId;
        this.content = content;
        this.timestamp = timestamp;
        this.isRead = isRead;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getSenderId() { return senderId; }
    public void setSenderId(UUID senderId) { this.senderId = senderId; }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public UUID getRecipientId() { return recipientId; }
    public void setRecipientId(UUID recipientId) { this.recipientId = recipientId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
} 