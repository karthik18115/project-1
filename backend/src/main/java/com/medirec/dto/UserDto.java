package com.medirec.dto;

import java.util.Set;
import java.util.UUID;

public class UserDto {
    private UUID uuid;
    private String name;
    private String email;
    private Set<String> roles;
    private String professionalInfo; // JSON or formatted string with workArea, specialization, etc.

    public UserDto() {}

    public UserDto(UUID uuid, String name, String email, Set<String> roles, String professionalInfo) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.roles = roles;
        this.professionalInfo = professionalInfo;
    }

    public UUID getUuid() { return uuid; }
    public void setUuid(UUID uuid) { this.uuid = uuid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }

    public String getProfessionalInfo() { return professionalInfo; }
    public void setProfessionalInfo(String professionalInfo) { this.professionalInfo = professionalInfo; }
} 