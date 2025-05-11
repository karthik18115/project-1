package com.medirec.dto;

import java.util.List;
import java.util.UUID;

public class DoctorDashboardDto {
    private long todayAppointments;
    private long todayCompleted;
    private long todayPending;
    private long weekTotalPatients;
    private long weekNoShow;
    private List<AppointmentDto> upcomingAppointments;
    private List<PatientSummaryDto> recentPatients;

    public DoctorDashboardDto() {}

    public DoctorDashboardDto(long todayAppointments, long todayCompleted, long todayPending,
                              long weekTotalPatients, long weekNoShow,
                              List<AppointmentDto> upcomingAppointments,
                              List<PatientSummaryDto> recentPatients) {
        this.todayAppointments = todayAppointments;
        this.todayCompleted = todayCompleted;
        this.todayPending = todayPending;
        this.weekTotalPatients = weekTotalPatients;
        this.weekNoShow = weekNoShow;
        this.upcomingAppointments = upcomingAppointments;
        this.recentPatients = recentPatients;
    }

    // Getters and setters
    public long getTodayAppointments() { return todayAppointments; }
    public void setTodayAppointments(long todayAppointments) { this.todayAppointments = todayAppointments; }

    public long getTodayCompleted() { return todayCompleted; }
    public void setTodayCompleted(long todayCompleted) { this.todayCompleted = todayCompleted; }

    public long getTodayPending() { return todayPending; }
    public void setTodayPending(long todayPending) { this.todayPending = todayPending; }

    public long getWeekTotalPatients() { return weekTotalPatients; }
    public void setWeekTotalPatients(long weekTotalPatients) { this.weekTotalPatients = weekTotalPatients; }

    public long getWeekNoShow() { return weekNoShow; }
    public void setWeekNoShow(long weekNoShow) { this.weekNoShow = weekNoShow; }

    public List<AppointmentDto> getUpcomingAppointments() { return upcomingAppointments; }
    public void setUpcomingAppointments(List<AppointmentDto> upcomingAppointments) { this.upcomingAppointments = upcomingAppointments; }

    public List<PatientSummaryDto> getRecentPatients() { return recentPatients; }
    public void setRecentPatients(List<PatientSummaryDto> recentPatients) { this.recentPatients = recentPatients; }
} 