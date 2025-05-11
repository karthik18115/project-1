package com.medirec.entity;

public enum RegistrationStatus {
    PENDING_APPROVAL, // Newly registered, awaiting admin review
    APPROVED,         // Approved by admin, account is active
    REJECTED,         // Rejected by admin, account is inactive/disabled
    PROFILE_INCOMPLETE // Approved, but needs to complete profile (optional, can be combined with User.profileSetupComplete)
} 