package com.medirec.dto;

import java.time.LocalDate;
import java.util.UUID;

public class PatientSummaryDto {
    private UUID id;
    private String name;
    private int age;
    private LocalDate lastVisit;
    private String condition;

    public PatientSummaryDto() {}

    public PatientSummaryDto(UUID id, String name, int age, LocalDate lastVisit, String condition) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.lastVisit = lastVisit;
        this.condition = condition;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public LocalDate getLastVisit() { return lastVisit; }
    public void setLastVisit(LocalDate lastVisit) { this.lastVisit = lastVisit; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
} 