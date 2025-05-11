package com.medirec.repository;

import com.medirec.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUuid(UUID uuid);
    List<User> findByRolesContains(String role);
} 