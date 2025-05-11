package com.medirec.repository;

import com.medirec.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findByDoctorUuid(UUID doctorUuid);
    List<Appointment> findByPatientUuid(UUID patientUuid);
    // Add other query methods as needed, e.g., by date range for calendar
} 