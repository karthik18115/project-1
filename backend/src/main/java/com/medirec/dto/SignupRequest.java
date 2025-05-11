package com.medirec.dto;

import java.time.LocalDate;

public class SignupRequest {
    // Essential fields
    private String fullName; // Renamed from name
    private String email;
    private String mobile;
    private String role;
    private String department;
    private String affiliation;
    private String governmentId;
    private String licenseProofDocument; // Renamed from professionalDocument (base64-encoded)
    private String experienceSummary;    // Renamed from professionalDetails
    private String gender;
    private String language;
    private String password;
    private boolean twoFactorPreference; // Renamed from enable2FA
    private LocalDate dateOfBirth;

    // Role-specific fields (optional, presence handled by frontend logic)
    // Doctor
    private String medicalCouncilName;
    private String emergencyResponseNumber;

    // Lab Technician
    private String labType;
    private String certifications; // e.g., comma-separated or JSON string

    // Admin
    private String organizationPosition;
    private String jurisdiction;
    private String accessLevel;

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getAffiliation() { return affiliation; }
    public void setAffiliation(String affiliation) { this.affiliation = affiliation; }

    public String getGovernmentId() { return governmentId; }
    public void setGovernmentId(String governmentId) { this.governmentId = governmentId; }

    public String getLicenseProofDocument() { return licenseProofDocument; }
    public void setLicenseProofDocument(String licenseProofDocument) { this.licenseProofDocument = licenseProofDocument; }

    public String getExperienceSummary() { return experienceSummary; }
    public void setExperienceSummary(String experienceSummary) { this.experienceSummary = experienceSummary; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public boolean isTwoFactorPreference() { return twoFactorPreference; }
    public void setTwoFactorPreference(boolean twoFactorPreference) { this.twoFactorPreference = twoFactorPreference; }

    // Role-specific Getters and Setters
    public String getMedicalCouncilName() { return medicalCouncilName; }
    public void setMedicalCouncilName(String medicalCouncilName) { this.medicalCouncilName = medicalCouncilName; }

    public String getEmergencyResponseNumber() { return emergencyResponseNumber; }
    public void setEmergencyResponseNumber(String emergencyResponseNumber) { this.emergencyResponseNumber = emergencyResponseNumber; }

    public String getLabType() { return labType; }
    public void setLabType(String labType) { this.labType = labType; }

    public String getCertifications() { return certifications; }
    public void setCertifications(String certifications) { this.certifications = certifications; }

    public String getOrganizationPosition() { return organizationPosition; }
    public void setOrganizationPosition(String organizationPosition) { this.organizationPosition = organizationPosition; }

    public String getJurisdiction() { return jurisdiction; }
    public void setJurisdiction(String jurisdiction) { this.jurisdiction = jurisdiction; }

    public String getAccessLevel() { return accessLevel; }
    public void setAccessLevel(String accessLevel) { this.accessLevel = accessLevel; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
} 