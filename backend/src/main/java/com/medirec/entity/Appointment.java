package com.medirec.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "uuid", updatable = false, nullable = false)
    private UUID uuid;

    @Column(name = "patient_uuid", nullable = false)
    private UUID patientUuid;

    @Column(name = "doctor_uuid", nullable = false)
    private UUID doctorUuid;

    @Column(nullable = false)
    private LocalDateTime appointmentDateTime;

    @Column(nullable = false)
    private String department;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(nullable = true) // Assuming status can be initially null or set to a default
    private String status; // e.g., "Pending Confirmation", "Confirmed", "Completed", "Cancelled"

    // Status, notes, createdAt, etc. can be added later

    // Getters and setters
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

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
} 