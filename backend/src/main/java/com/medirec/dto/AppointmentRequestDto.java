package com.medirec.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class AppointmentRequestDto {
    private UUID patientUuid;
    private LocalDateTime appointmentDateTime;
    private String department; // Or serviceType, specialization, etc.
    private String notes; // Optional notes for the appointment

    // Constructors
    public AppointmentRequestDto() {
    }

    public AppointmentRequestDto(UUID patientUuid, LocalDateTime appointmentDateTime, String department, String notes) {
        this.patientUuid = patientUuid;
        this.appointmentDateTime = appointmentDateTime;
        this.department = department;
        this.notes = notes;
    }

    // Getters and Setters
    public UUID getPatientUuid() {
        return patientUuid;
    }

    public void setPatientUuid(UUID patientUuid) {
        this.patientUuid = patientUuid;
    }

    public LocalDateTime getAppointmentDateTime() {
        return appointmentDateTime;
    }

    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
} 