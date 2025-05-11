package com.medirec.repository;

import com.medirec.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, UUID> {
    // Find all prescriptions for a specific patient
    List<Prescription> findByPatientUuid(UUID patientUuid);

    // Find all prescriptions issued by a specific doctor
    List<Prescription> findByDoctorUuid(UUID doctorUuid);

    // Example: Find prescriptions for a patient by a specific doctor
    List<Prescription> findByPatientUuidAndDoctorUuid(UUID patientUuid, UUID doctorUuid);
} 