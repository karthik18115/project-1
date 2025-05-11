package com.medirec.dto;

public class DashboardSummaryDto {
    private long activeDoctors;
    private long activeLabs;
    private long activePharmacies;
    private long pendingSignups;
    private long loginsToday;
    private long dataUploadsToday;

    public DashboardSummaryDto() {}

    public DashboardSummaryDto(long activeDoctors, long activeLabs, long activePharmacies,
                                long pendingSignups, long loginsToday, long dataUploadsToday) {
        this.activeDoctors = activeDoctors;
        this.activeLabs = activeLabs;
        this.activePharmacies = activePharmacies;
        this.pendingSignups = pendingSignups;
        this.loginsToday = loginsToday;
        this.dataUploadsToday = dataUploadsToday;
    }

    public long getActiveDoctors() { return activeDoctors; }
    public void setActiveDoctors(long activeDoctors) { this.activeDoctors = activeDoctors; }

    public long getActiveLabs() { return activeLabs; }
    public void setActiveLabs(long activeLabs) { this.activeLabs = activeLabs; }

    public long getActivePharmacies() { return activePharmacies; }
    public void setActivePharmacies(long activePharmacies) { this.activePharmacies = activePharmacies; }

    public long getPendingSignups() { return pendingSignups; }
    public void setPendingSignups(long pendingSignups) { this.pendingSignups = pendingSignups; }

    public long getLoginsToday() { return loginsToday; }
    public void setLoginsToday(long loginsToday) { this.loginsToday = loginsToday; }

    public long getDataUploadsToday() { return dataUploadsToday; }
    public void setDataUploadsToday(long dataUploadsToday) { this.dataUploadsToday = dataUploadsToday; }
} 