package com.medirec.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class AppointmentDto {
    private UUID uuid;
    private UUID patientUuid;
    private UUID doctorUuid;
    private LocalDateTime appointmentDateTime;
    private String department;
    private String status;

    public AppointmentDto() {}

    public AppointmentDto(UUID uuid, UUID patientUuid, UUID doctorUuid, LocalDateTime appointmentDateTime, String department, String status) {
        this.uuid = uuid;
        this.patientUuid = patientUuid;
        this.doctorUuid = doctorUuid;
        this.appointmentDateTime = appointmentDateTime;
        this.department = department;
        this.status = status;
    }

    public UUID getUuid() { return uuid; }
    public void setUuid(UUID uuid) { this.uuid = uuid; }

    public UUID getPatientUuid() { return patientUuid; }
    public void setPatientUuid(UUID patientUuid) { this.patientUuid = patientUuid; }

    public UUID getDoctorUuid() { return doctorUuid; }
    public void setDoctorUuid(UUID doctorUuid) { this.doctorUuid = doctorUuid; }

    public LocalDateTime getAppointmentDateTime() { return appointmentDateTime; }
    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) { this.appointmentDateTime = appointmentDateTime; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
} 