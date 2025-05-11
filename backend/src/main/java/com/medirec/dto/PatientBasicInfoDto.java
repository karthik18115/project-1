package com.medirec.dto;

// import com.medirec.entity.Gender; // No longer needed
import java.time.LocalDate;

public class PatientBasicInfoDto {
    private String uuid;
    private String name;
    private String email;
    private LocalDate dateOfBirth;
    private String gender; // Changed to String

    // Constructors
    public PatientBasicInfoDto() {
    }

    public PatientBasicInfoDto(String uuid, String name, String email, LocalDate dateOfBirth, String gender) { // Changed to String
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
    }

    // Getters and Setters
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() { // Changed to String
        return gender;
    }

    public void setGender(String gender) { // Changed to String
        this.gender = gender;
    }
} 