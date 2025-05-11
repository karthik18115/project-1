package com.medirec.controller;

import com.medirec.entity.User;
import com.medirec.repository.UserRepository;
import com.medirec.dto.PatientProfileDto; // Assuming this DTO will be created
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<PatientProfileDto> getCurrentPatientProfile(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        String username = authentication.getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        PatientProfileDto patientProfileDto = new PatientProfileDto(
                user.getUuid(),
                user.getName(),
                user.getEmail(),
                user.getMobile(),
                user.getDateOfBirth(),
                user.getGender(),
                user.getLanguage(),
                user.getAddress(),
                user.isProfileSetupComplete(),
                user.getAvatarUrl(),
                user.getBloodGroup(),
                user.getAllergies(),
                user.getChronicConditions(),
                user.getInsuranceProvider(),
                user.getInsurancePolicyId(),
                user.getInsuranceMemberId()
        );
        return ResponseEntity.ok(patientProfileDto);
    }

    @PutMapping("/me")
    public ResponseEntity<PatientProfileDto> updateCurrentPatientProfile(Authentication authentication, @RequestBody PatientProfileDto profileUpdateDto) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        String username = authentication.getName(); // This is the email
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        // Update user fields from DTO
        // Basic info
        if (profileUpdateDto.getName() != null) user.setName(profileUpdateDto.getName());
        if (profileUpdateDto.getMobile() != null) user.setMobile(profileUpdateDto.getMobile());
        if (profileUpdateDto.getDateOfBirth() != null) user.setDateOfBirth(profileUpdateDto.getDateOfBirth());
        if (profileUpdateDto.getGender() != null) user.setGender(profileUpdateDto.getGender());
        if (profileUpdateDto.getLanguage() != null) user.setLanguage(profileUpdateDto.getLanguage());
        if (profileUpdateDto.getAddress() != null) user.setAddress(profileUpdateDto.getAddress());
        if (profileUpdateDto.getAvatarUrl() != null) user.setAvatarUrl(profileUpdateDto.getAvatarUrl());
        
        // Medical info
        if (profileUpdateDto.getBloodGroup() != null) user.setBloodGroup(profileUpdateDto.getBloodGroup());
        if (profileUpdateDto.getAllergies() != null) user.setAllergies(profileUpdateDto.getAllergies());
        if (profileUpdateDto.getChronicConditions() != null) user.setChronicConditions(profileUpdateDto.getChronicConditions());

        // Insurance info
        if (profileUpdateDto.getInsuranceProvider() != null) user.setInsuranceProvider(profileUpdateDto.getInsuranceProvider());
        if (profileUpdateDto.getInsurancePolicyId() != null) user.setInsurancePolicyId(profileUpdateDto.getInsurancePolicyId());
        if (profileUpdateDto.getInsuranceMemberId() != null) user.setInsuranceMemberId(profileUpdateDto.getInsuranceMemberId());

        // Mark profile as complete after an update attempt that includes more than just ID/email
        user.setProfileSetupComplete(true);

        User updatedUser = userRepository.save(user);

        // Return the updated profile as DTO
        PatientProfileDto updatedDto = new PatientProfileDto(
            updatedUser.getUuid(), updatedUser.getName(), updatedUser.getEmail(), updatedUser.getMobile(),
            updatedUser.getDateOfBirth(), updatedUser.getGender(), updatedUser.getLanguage(), updatedUser.getAddress(),
            updatedUser.isProfileSetupComplete(), updatedUser.getAvatarUrl(), updatedUser.getBloodGroup(),
            updatedUser.getAllergies(), updatedUser.getChronicConditions(), updatedUser.getInsuranceProvider(),
            updatedUser.getInsurancePolicyId(), updatedUser.getInsuranceMemberId()
        );
        return ResponseEntity.ok(updatedDto);
    }
} 