package com.medirec.dto;

public class SettingsDto {
    private boolean maintenanceMode;
    private String supportEmail;

    public SettingsDto() {}

    public SettingsDto(boolean maintenanceMode, String supportEmail) {
        this.maintenanceMode = maintenanceMode;
        this.supportEmail = supportEmail;
    }

    public boolean isMaintenanceMode() { return maintenanceMode; }
    public void setMaintenanceMode(boolean maintenanceMode) { this.maintenanceMode = maintenanceMode; }

    public String getSupportEmail() { return supportEmail; }
    public void setSupportEmail(String supportEmail) { this.supportEmail = supportEmail; }
} 