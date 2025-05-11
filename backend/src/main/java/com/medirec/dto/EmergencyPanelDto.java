package com.medirec.dto;

import java.util.List;

public class EmergencyPanelDto {
    private long totalBeds;
    private long occupiedBeds;
    private List<String> criticalAlerts;

    public EmergencyPanelDto() {}

    public EmergencyPanelDto(long totalBeds, long occupiedBeds, List<String> criticalAlerts) {
        this.totalBeds = totalBeds;
        this.occupiedBeds = occupiedBeds;
        this.criticalAlerts = criticalAlerts;
    }

    public long getTotalBeds() { return totalBeds; }
    public void setTotalBeds(long totalBeds) { this.totalBeds = totalBeds; }

    public long getOccupiedBeds() { return occupiedBeds; }
    public void setOccupiedBeds(long occupiedBeds) { this.occupiedBeds = occupiedBeds; }

    public List<String> getCriticalAlerts() { return criticalAlerts; }
    public void setCriticalAlerts(List<String> criticalAlerts) { this.criticalAlerts = criticalAlerts; }
} 