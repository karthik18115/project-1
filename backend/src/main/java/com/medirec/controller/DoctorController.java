package com.medirec.controller;

import com.medirec.dto.AppointmentDto;
import com.medirec.dto.AppointmentRequestDto;
import com.medirec.dto.DoctorDashboardDto;
import com.medirec.dto.MessageContactDto;
import com.medirec.dto.MessageDto;
import com.medirec.dto.QueueItemDto;
import com.medirec.dto.PrescriptionRequestDto;
import com.medirec.dto.PrescriptionResponseDto;
import com.medirec.dto.TextMessageRequestDto;
import com.medirec.entity.User;
import com.medirec.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService /*, UserService userService */) {
        this.doctorService = doctorService;
        // this.userService = userService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DoctorDashboardDto> getDashboard() {
        return ResponseEntity.ok(doctorService.getDashboardOverview());
    }

    @GetMapping("/queue")
    public ResponseEntity<List<QueueItemDto>> getQueue() {
        return ResponseEntity.ok(doctorService.getQueue());
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentDto>> getAppointments() {
        return ResponseEntity.ok(doctorService.getAppointments());
    }

    @PostMapping("/appointments")
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentRequestDto requestDto) {
        return ResponseEntity.ok(doctorService.createAppointment(requestDto));
    }

    @GetMapping("/messages/contacts")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<List<MessageContactDto>> getMessageContacts() {
        List<MessageContactDto> contacts = doctorService.getMessageContacts();
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/messages/contact/{contactId}")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<List<MessageDto>> getMessagesForContact(@PathVariable UUID contactId) {
        List<MessageDto> messages = doctorService.getMessagesForContact(contactId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/messages/contact/{contactId}")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<MessageDto> postMessageToContact(
            @PathVariable UUID contactId,
            @Valid @RequestBody TextMessageRequestDto messageRequestDto) {
        // Assuming TextMessageRequestDto has a simple "String content" field
        MessageDto sentMessage = doctorService.postMessageToContact(contactId, messageRequestDto.getContent());
        return new ResponseEntity<>(sentMessage, HttpStatus.CREATED);
    }

    @GetMapping("/calendar")
    public ResponseEntity<List<AppointmentDto>> getCalendar() {
        return ResponseEntity.ok(doctorService.getCalendarEvents());
    }

    @GetMapping("/lab-results")
    public ResponseEntity<List<AppointmentDto>> getLabResults() {
        return ResponseEntity.ok(doctorService.getLabResults());
    }

    @GetMapping("/prescriptions")
    public ResponseEntity<List<PrescriptionResponseDto>> getPrescriptions() {
        List<PrescriptionResponseDto> prescriptions = doctorService.getPrescriptionsLog();
        return ResponseEntity.ok(prescriptions);
    }

    @GetMapping("/patients")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<List<com.medirec.dto.PatientBasicInfoDto>> getAllPatients() {
        return ResponseEntity.ok(doctorService.getAllPatients());
    }

    @GetMapping("/patients/{patientUuid}")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<com.medirec.dto.PatientProfileDto> getPatientProfileForDoctorView(@PathVariable String patientUuid) {
        return ResponseEntity.ok(doctorService.getPatientByUuidForDoctorView(patientUuid));
    }

    @PostMapping("/appointments/{appointmentId}/complete")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<AppointmentDto> markAppointmentAsCompleted(@PathVariable UUID appointmentId) {
        AppointmentDto updatedAppointment = doctorService.markAppointmentAsCompleted(appointmentId);
        return ResponseEntity.ok(updatedAppointment);
    }

    @PostMapping("/appointments/{appointmentId}/cancel")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<AppointmentDto> cancelAppointment(@PathVariable UUID appointmentId) {
        AppointmentDto updatedAppointment = doctorService.cancelAppointment(appointmentId);
        return ResponseEntity.ok(updatedAppointment);
    }

    @PostMapping("/prescriptions")
    public ResponseEntity<PrescriptionResponseDto> createPrescription(
            @Valid @RequestBody PrescriptionRequestDto prescriptionRequestDto,
            @AuthenticationPrincipal User authenticatedUser) {
        
        PrescriptionResponseDto createdPrescription = doctorService.createPrescription(prescriptionRequestDto, authenticatedUser);
        return new ResponseEntity<>(createdPrescription, HttpStatus.CREATED);
    }
} 