package com.medirec.dto;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;
import java.util.HashSet;

public class PatientProfileDto {
    private UUID id;
    private String name;
    private String email;
    private String mobile;
    private LocalDate dateOfBirth;
    private String gender;
    private String language;
    private String address;
    private boolean profileSetupComplete;

    // New fields
    private String avatarUrl;
    private String bloodGroup;
    private Set<String> allergies = new HashSet<>();
    private Set<String> chronicConditions = new HashSet<>();
    private String insuranceProvider;
    private String insurancePolicyId;
    private String insuranceMemberId;

    // Constructor updated to include all fields
    public PatientProfileDto(UUID id, String name, String email, String mobile, LocalDate dateOfBirth, 
                             String gender, String language, String address, boolean profileSetupComplete,
                             String avatarUrl, String bloodGroup, Set<String> allergies, 
                             Set<String> chronicConditions, String insuranceProvider, 
                             String insurancePolicyId, String insuranceMemberId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.language = language;
        this.address = address;
        this.profileSetupComplete = profileSetupComplete;
        this.avatarUrl = avatarUrl;
        this.bloodGroup = bloodGroup;
        this.allergies = allergies != null ? allergies : new HashSet<>();
        this.chronicConditions = chronicConditions != null ? chronicConditions : new HashSet<>();
        this.insuranceProvider = insuranceProvider;
        this.insurancePolicyId = insurancePolicyId;
        this.insuranceMemberId = insuranceMemberId;
    }
    
    // Default constructor for frameworks/libraries that might need it
    public PatientProfileDto() {
        this.allergies = new HashSet<>();
        this.chronicConditions = new HashSet<>();
    }

    // Getters and Setters for all fields (existing and new)
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public boolean isProfileSetupComplete() { return profileSetupComplete; }
    public void setProfileSetupComplete(boolean profileSetupComplete) { this.profileSetupComplete = profileSetupComplete; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public Set<String> getAllergies() { return allergies; }
    public void setAllergies(Set<String> allergies) { this.allergies = allergies != null ? allergies : new HashSet<>(); }
    public Set<String> getChronicConditions() { return chronicConditions; }
    public void setChronicConditions(Set<String> chronicConditions) { this.chronicConditions = chronicConditions != null ? chronicConditions : new HashSet<>(); }
    public String getInsuranceProvider() { return insuranceProvider; }
    public void setInsuranceProvider(String insuranceProvider) { this.insuranceProvider = insuranceProvider; }
    public String getInsurancePolicyId() { return insurancePolicyId; }
    public void setInsurancePolicyId(String insurancePolicyId) { this.insurancePolicyId = insurancePolicyId; }
    public String getInsuranceMemberId() { return insuranceMemberId; }
    public void setInsuranceMemberId(String insuranceMemberId) { this.insuranceMemberId = insuranceMemberId; }
} 