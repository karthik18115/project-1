package com.medirec.repository;

import com.medirec.entity.SignupRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SignupRequestRepository extends JpaRepository<SignupRequest, UUID> {
    List<SignupRequest> findByStatus(String status);
} 