// =================== AUTH ===================
// LOGIN COMPONENT
// Sends POST request to /api/auth/login
// Payload: { email: string, password: string }
// Expects: { token: string, role: string }

// SIGNUP COMPONENT
// Sends POST request to /api/auth/signup
// Payload: { name: string, email: string, password: string, role: 'PATIENT' | 'DOCTOR' | 'LAB_STAFF' | 'PHARMACY' | 'ADMIN' | 'EMERGENCY_DOCTOR' }
// Expects: { uuid: string, message: string }


// =================== ADMIN PANEL ===================
// GET /api/admin/users                         -> Array<UserDto>
// GET /api/admin/users/{uuid}                  -> UserDto
// POST /api/admin/users                        -> Payload: { name, email, role, professionalInfo }
// PUT /api/admin/users/{uuid}                  -> Payload: { name?, email?, role?, professionalInfo? }
// DELETE /api/admin/users/{uuid}
// GET /api/admin/pending-requests              -> Array<SignupRequestDto>
// PUT /api/admin/pending-requests/{uuid}/approve -> { message }
// GET /api/admin/logs                          -> Array<LogEntryDto>
// GET /api/admin/doctor-panel                  -> DoctorPanelDto
// GET /api/admin/emergency-panel               -> EmergencyPanelDto
// GET /api/admin/lab-panel                     -> LabPanelDto
// GET /api/admin/pharmacy-panel                -> PharmacyPanelDto
// GET /api/admin/settings                      -> SettingsDto
// PUT /api/admin/settings                      -> SettingsDto


// =================== PATIENT DASHBOARD ===================
// GET /api/patient/dashboard                   -> PatientDashboardDto
// GET /api/patient/appointments                -> Array<AppointmentDto>
// POST /api/patient/appointments               -> { date, time, doctorUuid, department } -> AppointmentDto
// GET /api/patient/medical-records             -> Array<RecordDto>
// POST /api/patient/medical-records            -> { title, description, date, doctorName, reportUrl }
// GET /api/patient/prescriptions               -> Array<PrescriptionDto>
// GET /api/patient/documents                   -> Array<DocumentDto>
// GET /api/patient/timeline                    -> Array<TimelineItemDto>
// GET /api/patient/graphs                      -> GraphDataDto
// GET /api/patient/notifications               -> Array<NotificationDto>
// GET /api/patient/messages                    -> Array<MessageDto>


// =================== DOCTOR DASHBOARD ===================
// GET /api/doctor/dashboard                    -> DoctorDashboardDto
// GET /api/doctor/patients                     -> Array<PatientSummaryDto>
// GET /api/doctor/queue                        -> Array<QueueItemDto>
// GET /api/doctor/appointments                 -> Array<AppointmentDto>
// POST /api/doctor/appointments                -> { patientUuid, date, time, notes } -> AppointmentDto
// GET /api/doctor/messages                     -> Array<MessageDto>
// GET /api/doctor/lab-results                  -> Array<LabResultDto>
// POST /api/doctor/prescriptions               -> { patientUuid, medication, dosage, notes } -> PrescriptionDto
// GET /api/doctor/patient/{uuid}/profile       -> Full PatientDto


// =================== PHARMACY MODULE ===================
// GET /api/pharmacy/dashboard                  -> PharmacyDashboardDto
// GET /api/pharmacy/inbox                      -> Array<PrescriptionOrderDto>
// POST /api/pharmacy/dispense                  -> { orderUuid, dispensedByUuid, quantity } -> DispenseDto
// GET /api/pharmacy/logs                       -> Array<DispenseLogDto>
// GET /api/pharmacy/inventory                  -> Array<InventoryItemDto>
// POST /api/pharmacy/inventory                 -> { drugName, batchId, expiryDate, quantity }
// GET /api/pharmacy/patient-interactions       -> Array<InteractionDto>
// GET /api/pharmacy/communication              -> Array<CommunicationDto>
// GET /api/pharmacy/reports                    -> Array<ReportDto>
// GET /api/pharmacy/settings                   -> SettingsDto
// PUT /api/pharmacy/settings                   -> SettingsDto


// =================== LAB CENTER MODULE ===================
// GET /api/labcenter/dashboard                 -> LabCenterDashboardDto
// GET /api/labcenter/requests                  -> Array<LabRequestDto>
// POST /api/labcenter/requests                 -> { patientUuid, testType, priority } -> LabRequestDto
// GET /api/labcenter/results                   -> Array<LabResultDto>
// POST /api/labcenter/results                  -> { requestUuid, resultData, uploadedFileUrl } -> LabResultDto


// =================== EMERGENCY MODULE ===================
// GET /api/emergency/dashboard                 -> EmergencyDashboardDto
// GET /api/emergency/triage-queue              -> Array<TriageDto>
// POST /api/emergency/triage                   -> { patientUuid, severity, vitals } -> TriageDto
// GET /api/emergency/history                   -> Array<EmergencyCaseDto>
// GET /api/emergency/patient-access            -> Array<PatientAccessDto>
// GET /api/emergency/orders                    -> Array<EmergencyOrderDto>
// POST /api/emergency/orders                   -> { type: 'prescription'|'lab'|'referral', payload: Object } -> EmergencyOrderDto
// GET /api/emergency/collaboration             -> Array<CollaborationDto>
// POST /api/emergency/collaboration            -> { caseUuid, message, taggedDoctorUuids } -> CollaborationDto
// GET /api/emergency/progress                  -> Array<ProgressDto>
// GET /api/emergency/settings                  -> SettingsDto
// PUT /api/emergency/settings                  -> SettingsDto

// ===================================================================
// NOTE: All resource IDs in the URL are UUID strings to ensure global uniqueness. 