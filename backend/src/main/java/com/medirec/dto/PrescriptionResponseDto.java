package com.medirec.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public class PrescriptionResponseDto {

    private UUID id;
    private UUID patientUuid;
    private String patientName; // For convenience
    private UUID doctorUuid;
    private String doctorName; // For convenience
    private String medication;
    private String dosage;
    private String frequency;
    private LocalDate startDate;
    private LocalDate endDate;
    private String notes;
    private LocalDateTime prescriptionDate;

    // Constructors, Getters, and Setters

    public PrescriptionResponseDto() {
    }

    public PrescriptionResponseDto(UUID id, UUID patientUuid, String patientName, UUID doctorUuid, String doctorName, String medication, String dosage, String frequency, LocalDate startDate, LocalDate endDate, String notes, LocalDateTime prescriptionDate) {
        this.id = id;
        this.patientUuid = patientUuid;
        this.patientName = patientName;
        this.doctorUuid = doctorUuid;
        this.doctorName = doctorName;
        this.medication = medication;
        this.dosage = dosage;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
        this.prescriptionDate = prescriptionDate;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getPatientUuid() {
        return patientUuid;
    }

    public void setPatientUuid(UUID patientUuid) {
        this.patientUuid = patientUuid;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public UUID getDoctorUuid() {
        return doctorUuid;
    }

    public void setDoctorUuid(UUID doctorUuid) {
        this.doctorUuid = doctorUuid;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
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

    public LocalDateTime getPrescriptionDate() {
        return prescriptionDate;
    }

    public void setPrescriptionDate(LocalDateTime prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }
} 