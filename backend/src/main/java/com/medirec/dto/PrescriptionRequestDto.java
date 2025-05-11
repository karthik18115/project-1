package com.medirec.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.FutureOrPresent;
import java.time.LocalDate;
import java.util.UUID;

public class PrescriptionRequestDto {

    @NotNull(message = "Patient UUID cannot be null")
    private UUID patientUuid;

    @NotBlank(message = "Medication cannot be blank")
    private String medication;

    @NotBlank(message = "Dosage cannot be blank")
    private String dosage;

    @NotBlank(message = "Frequency cannot be blank")
    private String frequency;

    @NotNull(message = "Start date cannot be null")
    @FutureOrPresent(message = "Start date must be in the present or future")
    private LocalDate startDate;

    private LocalDate endDate; // Optional

    private String notes; // Optional

    // Getters and Setters
    public UUID getPatientUuid() {
        return patientUuid;
    }

    public void setPatientUuid(UUID patientUuid) {
        this.patientUuid = patientUuid;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
} 