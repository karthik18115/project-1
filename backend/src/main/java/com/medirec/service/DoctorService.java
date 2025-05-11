package com.medirec.service;

import com.medirec.dto.*;
import com.medirec.entity.User;
import com.medirec.entity.Prescription;
import com.medirec.entity.Message;
import com.medirec.repository.UserRepository;
import com.medirec.repository.AppointmentRepository;
import com.medirec.mapper.AppointmentMapper;
import com.medirec.entity.Appointment;
import com.medirec.repository.PrescriptionRepository;
import com.medirec.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

@Service
public class DoctorService {

    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final PrescriptionRepository prescriptionRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public DoctorService(UserRepository userRepository,
                         AppointmentRepository appointmentRepository,
                         AppointmentMapper appointmentMapper,
                         PrescriptionRepository prescriptionRepository,
                         MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
        this.prescriptionRepository = prescriptionRepository;
        this.messageRepository = messageRepository;
    }

    public DoctorDashboardDto getDashboardOverview() {
        // Stub data with sample upcoming appointments and recent patients
        List<AppointmentDto> upcoming = Arrays.asList(
            new AppointmentDto(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID(), LocalDateTime.now().plusHours(1), "Cardiology", "Scheduled"),
            new AppointmentDto(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID(), LocalDateTime.now().plusHours(2), "Pathology", "Scheduled")
        );
        List<PatientSummaryDto> recent = Arrays.asList(
            new PatientSummaryDto(UUID.randomUUID(), "John Doe", 45, LocalDate.now().minusDays(1), "Hypertension"),
            new PatientSummaryDto(UUID.randomUUID(), "Jane Smith", 32, LocalDate.now().minusDays(2), "Diabetes")
        );
        return new DoctorDashboardDto(
            8L, // todayAppointments
            3L, // todayCompleted
            5L, // todayPending
            35L, // weekTotalPatients
            2L, // weekNoShow
            upcoming,
            recent
        );
    }

    public List<QueueItemDto> getQueue() {
        // Stub example queue items
        return Arrays.asList(
            new QueueItemDto(UUID.randomUUID(), "John Doe", 45, "Male", "ER-1", "Chest Pain", "Critical", LocalDateTime.now().minusMinutes(45), "45 mins", "Waiting"),
            new QueueItemDto(UUID.randomUUID(), "Jane Smith", 32, "Female", "ER-2", "Abdominal Pain", "Urgent", LocalDateTime.now().minusMinutes(30), "30 mins", "Awaiting MD")
        );
    }

    public List<AppointmentDto> getAppointments() {
        User currentUser = getCurrentUser();
        if (currentUser == null) {
            // Or throw an exception, or handle as per your security design
            return List.of();
        }
        List<Appointment> appointments = appointmentRepository.findByDoctorUuid(currentUser.getUuid());
        return appointmentMapper.appointmentsToAppointmentDtos(appointments);
    }

    public AppointmentDto createAppointment(AppointmentRequestDto requestDto) {
        User currentUser = getCurrentUser();
        if (currentUser == null) {
            throw new RuntimeException("User must be authenticated to create an appointment.");
        }

        if (requestDto.getPatientUuid() == null) {
            throw new IllegalArgumentException("Patient UUID must be provided to create an appointment.");
        }
        // Optionally, validate if patientUuid corresponds to an actual patient
        userRepository.findByUuid(requestDto.getPatientUuid())
                .orElseThrow(() -> new RuntimeException("Patient not found with UUID: " + requestDto.getPatientUuid()));

        Appointment appointment = appointmentMapper.appointmentRequestDtoToAppointment(requestDto);
        appointment.setDoctorUuid(currentUser.getUuid()); // Set doctor from authenticated principal
        appointment.setStatus("Confirmed"); // Set default status for new appointments
        // UUID for appointment itself is generated by JPA

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return appointmentMapper.appointmentToAppointmentDto(savedAppointment);
    }

    public List<MessageDto> getMessages() {
        // Stub: no real messages
        return List.of(
            new MessageDto(UUID.randomUUID(), UUID.randomUUID(), "Patient A", UUID.randomUUID(), "Hello doctor", LocalDateTime.now().minusMinutes(5), false),
            new MessageDto(UUID.randomUUID(), UUID.randomUUID(), "Dr. You", UUID.randomUUID(), "How can I help?", LocalDateTime.now(), false)
        );
    }

    public List<AppointmentDto> getCalendarEvents() {
        // Now uses the implemented getAppointments method
        return getAppointments();
    }

    public List<AppointmentDto> getLabResults() {
        // Stub: no real lab results
        return List.of();
    }

    public List<PrescriptionResponseDto> getPrescriptionsLog() {
        User currentUser = getCurrentUser();
        if (currentUser == null) {
            // Or throw an exception, or handle as per your security design
            // For example, throw new IllegalStateException("User must be authenticated to view prescriptions.");
            return List.of(); 
        }
        List<com.medirec.entity.Prescription> prescriptions = prescriptionRepository.findByDoctorUuid(currentUser.getUuid());
        return prescriptions.stream()
                .map(this::mapToPrescriptionResponseDto)
                .collect(Collectors.toList());
    }

    public List<PatientBasicInfoDto> getAllPatients() {
        List<User> patientUsers = userRepository.findByRolesContains("ROLE_PATIENT");
        return patientUsers.stream()
            .map(user -> new PatientBasicInfoDto(
                user.getUuid().toString(),
                user.getName(),
                user.getEmail(),
                user.getDateOfBirth(),
                user.getGender()
            ))
            .collect(Collectors.toList());
    }

    public PatientProfileDto getPatientByUuidForDoctorView(String patientUuid) {
        User user = userRepository.findByUuid(UUID.fromString(patientUuid))
                .orElseThrow(() -> new RuntimeException("Patient not found with UUID: " + patientUuid)); // Consider a custom, more specific exception

        // Optional: Check if the user is indeed a patient if necessary based on your rules
        // if (!user.getRoles().contains("ROLE_PATIENT")) {
        //     throw new RuntimeException("User is not a patient: " + patientUuid);
        // }

        // Map User entity to PatientProfileDto
        // This mapping assumes PatientProfileDto has corresponding setters for all fields from User
        PatientProfileDto dto = new PatientProfileDto();
        dto.setId(user.getUuid());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setMobile(user.getMobile());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setGender(user.getGender()); // String
        dto.setLanguage(user.getLanguage());
        dto.setAddress(user.getAddress());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setBloodGroup(user.getBloodGroup());
        dto.setAllergies(user.getAllergies()); // Assuming Set<String>
        dto.setChronicConditions(user.getChronicConditions()); // Assuming Set<String>
        dto.setInsuranceProvider(user.getInsuranceProvider());
        dto.setInsurancePolicyId(user.getInsurancePolicyId());
        dto.setInsuranceMemberId(user.getInsuranceMemberId());
        dto.setProfileSetupComplete(user.isProfileSetupComplete());
        // Add any other relevant fields from User to PatientProfileDto

        return dto;
    }

    public AppointmentDto markAppointmentAsCompleted(UUID appointmentId) {
        User currentUser = getCurrentUser();
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found: " + appointmentId));

        // Optional: Check if the appointment belongs to the current doctor
        if (!appointment.getDoctorUuid().equals(currentUser.getUuid())) {
            throw new SecurityException("Doctor is not authorized to update this appointment.");
        }

        // Optionally: Check if the appointment can be marked as completed (e.g., not already cancelled)
        if ("Cancelled".equalsIgnoreCase(appointment.getStatus())) {
            throw new IllegalStateException("Cannot complete a cancelled appointment.");
        }

        appointment.setStatus("Completed");
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return appointmentMapper.appointmentToAppointmentDto(updatedAppointment);
    }

    public AppointmentDto cancelAppointment(UUID appointmentId) {
        User currentUser = getCurrentUser();
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found: " + appointmentId));

        // Optional: Check if the appointment belongs to the current doctor
        if (!appointment.getDoctorUuid().equals(currentUser.getUuid())) {
            throw new SecurityException("Doctor is not authorized to update this appointment.");
        }

        // Optionally: Check if the appointment can be cancelled (e.g., not already completed)
        if ("Completed".equalsIgnoreCase(appointment.getStatus())) {
            throw new IllegalStateException("Cannot cancel a completed appointment.");
        }
        
        appointment.setStatus("Cancelled");
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return appointmentMapper.appointmentToAppointmentDto(updatedAppointment);
    }

    @Transactional
    public PrescriptionResponseDto createPrescription(PrescriptionRequestDto requestDto, User doctor) {
        User patient = userRepository.findById(requestDto.getPatientUuid())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with UUID: " + requestDto.getPatientUuid()));

        Prescription prescription = new Prescription();
        prescription.setPatient(patient);
        prescription.setDoctor(doctor);
        prescription.setMedication(requestDto.getMedication());
        prescription.setDosage(requestDto.getDosage());
        prescription.setFrequency(requestDto.getFrequency());
        prescription.setStartDate(requestDto.getStartDate());
        prescription.setEndDate(requestDto.getEndDate()); // Can be null
        prescription.setNotes(requestDto.getNotes()); // Can be null
        // prescriptionDate is set by @PrePersist in Prescription entity

        Prescription savedPrescription = prescriptionRepository.save(prescription);

        return mapToPrescriptionResponseDto(savedPrescription);
    }

    private PrescriptionResponseDto mapToPrescriptionResponseDto(Prescription prescription) {
        return new PrescriptionResponseDto(
                prescription.getId(),
                prescription.getPatient().getUuid(),
                prescription.getPatient().getName(), // Assumes User has getName()
                prescription.getDoctor().getUuid(),
                prescription.getDoctor().getName(), // Assumes User has getName()
                prescription.getMedication(),
                prescription.getDosage(),
                prescription.getFrequency(),
                prescription.getStartDate(),
                prescription.getEndDate(),
                prescription.getNotes(),
                prescription.getPrescriptionDate()
        );
    }

    // Helper method to get current user (can be moved to a utility class or AuthService)
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return null;
        }
        // Assuming your UserDetails implementation is your User entity or wraps it
        // This might need adjustment based on your UserDetailsServiceImpl
        Object principal = authentication.getPrincipal();
        if (principal instanceof User) { // If UserDetails is User entity
            return (User) principal;
        } else if (principal instanceof org.springframework.security.core.userdetails.User) {
            // If using Spring's User, you need to fetch your User entity by username
            String username = ((org.springframework.security.core.userdetails.User) principal).getUsername();
            return userRepository.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("Authenticated user not found in database: " + username));
        }
        // Handle other UserDetails implementations or throw an error
        throw new IllegalStateException("Cannot determine current user from principal type: " + principal.getClass().getName());
    }

    // Method to map Message entity to MessageDto
    private MessageDto mapMessageToDto(Message message) {
        if (message == null) return null;
        return new MessageDto(
                message.getId(),
                message.getSender().getUuid(),
                message.getSender().getName(), // Assumes User entity has getName()
                message.getRecipient().getUuid(),
                message.getContent(),
                message.getTimestamp(),
                message.isRead()
        );
    }

    @Transactional(readOnly = true)
    public List<MessageContactDto> getMessageContacts() {
        User currentUser = getCurrentUser();
        if (currentUser == null) return Collections.emptyList();

        List<UUID> contactUuids = messageRepository.findContactUuids(currentUser.getUuid());
        List<MessageContactDto> contacts = new ArrayList<>();

        for (UUID contactUuid : contactUuids) {
            User contactUser = userRepository.findById(contactUuid)
                    .orElse(null); // Handle case where user might have been deleted
            if (contactUser == null) continue;

            Message lastMessage = messageRepository.findTopBySenderUuidAndRecipientUuidOrSenderUuidAndRecipientUuidOrderByTimestampDesc(
                    currentUser.getUuid(), contactUuid, contactUuid, currentUser.getUuid()
            );
            
            long unreadCount = messageRepository.countBySenderUuidAndRecipientUuidAndIsReadFalse(contactUuid, currentUser.getUuid());

            contacts.add(new MessageContactDto(
                    contactUser.getUuid(),
                    contactUser.getName(),
                    contactUser.getRoles().stream().findFirst().orElse("User"), // Simplified role display
                    lastMessage != null ? lastMessage.getContent() : "No messages yet",
                    lastMessage != null ? lastMessage.getTimestamp() : null,
                    unreadCount,
                    contactUser.getAvatarUrl()
            ));
        }
        // Sort contacts by last message timestamp, descending
        contacts.sort(Comparator.comparing(MessageContactDto::getLastMessageTimestamp, 
                      Comparator.nullsLast(Comparator.reverseOrder())));
        return contacts;
    }

    @Transactional // Mark messages as read when fetched
    public List<MessageDto> getMessagesForContact(UUID contactUuid) {
        User currentUser = getCurrentUser();
        if (currentUser == null) return Collections.emptyList();

        List<Message> messages = messageRepository.findMessagesBetweenUsers(currentUser.getUuid(), contactUuid);
        
        // Mark messages sent by the contact to the current user as read
        messages.stream()
            .filter(msg -> msg.getSender().getUuid().equals(contactUuid) && !msg.isRead())
            .forEach(msg -> {
                msg.setRead(true);
                messageRepository.save(msg); // Save the updated read status
            });

        return messages.stream()
                .map(this::mapMessageToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public MessageDto postMessageToContact(UUID contactUuid, String content) {
        User sender = getCurrentUser();
        if (sender == null) {
            throw new IllegalStateException("User must be authenticated to send messages.");
        }
        User recipient = userRepository.findById(contactUuid)
                .orElseThrow(() -> new EntityNotFoundException("Recipient not found with UUID: " + contactUuid));

        Message newMessage = new Message();
        newMessage.setSender(sender);
        newMessage.setRecipient(recipient);
        newMessage.setContent(content);
        // Timestamp and isRead are handled by @PrePersist and default value

        Message savedMessage = messageRepository.save(newMessage);
        return mapMessageToDto(savedMessage);
    }
} 