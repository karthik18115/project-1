package com.medirec.dto;

public class DoctorPanelDto {
    private long totalDoctors;
    private long activeDoctors;
    private long patientsWaiting;

    public DoctorPanelDto() {}

    public DoctorPanelDto(long totalDoctors, long activeDoctors, long patientsWaiting) {
        this.totalDoctors = totalDoctors;
        this.activeDoctors = activeDoctors;
        this.patientsWaiting = patientsWaiting;
    }

    public long getTotalDoctors() { return totalDoctors; }
    public void setTotalDoctors(long totalDoctors) { this.totalDoctors = totalDoctors; }

    public long getActiveDoctors() { return activeDoctors; }
    public void setActiveDoctors(long activeDoctors) { this.activeDoctors = activeDoctors; }

    public long getPatientsWaiting() { return patientsWaiting; }
    public void setPatientsWaiting(long patientsWaiting) { this.patientsWaiting = patientsWaiting; }
} 