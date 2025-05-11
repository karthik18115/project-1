package com.medirec.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class MessageContactDto {
    private UUID contactId; // The UUID of the other user in the conversation
    private String contactName;
    private String contactRole; // e.g., "Patient", "Doctor"
    private String lastMessageContent;
    private LocalDateTime lastMessageTimestamp;
    private long unreadCount;
    private String avatarUrl; // Optional: for contact display

    public MessageContactDto() {
    }

    public MessageContactDto(UUID contactId, String contactName, String contactRole, String lastMessageContent, LocalDateTime lastMessageTimestamp, long unreadCount, String avatarUrl) {
        this.contactId = contactId;
        this.contactName = contactName;
        this.contactRole = contactRole;
        this.lastMessageContent = lastMessageContent;
        this.lastMessageTimestamp = lastMessageTimestamp;
        this.unreadCount = unreadCount;
        this.avatarUrl = avatarUrl;
    }

    // Getters and Setters
    public UUID getContactId() {
        return contactId;
    }

    public void setContactId(UUID contactId) {
        this.contactId = contactId;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactRole() {
        return contactRole;
    }

    public void setContactRole(String contactRole) {
        this.contactRole = contactRole;
    }

    public String getLastMessageContent() {
        return lastMessageContent;
    }

    public void setLastMessageContent(String lastMessageContent) {
        this.lastMessageContent = lastMessageContent;
    }

    public LocalDateTime getLastMessageTimestamp() {
        return lastMessageTimestamp;
    }

    public void setLastMessageTimestamp(LocalDateTime lastMessageTimestamp) {
        this.lastMessageTimestamp = lastMessageTimestamp;
    }

    public long getUnreadCount() {
        return unreadCount;
    }

    public void setUnreadCount(long unreadCount) {
        this.unreadCount = unreadCount;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
} 