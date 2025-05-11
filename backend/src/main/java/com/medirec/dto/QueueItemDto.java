package com.medirec.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class QueueItemDto {
    private UUID id;
    private String name;
    private int age;
    private String gender;
    private String room;
    private String condition;
    private String priority;
    private LocalDateTime admissionTime;
    private String waitTime;
    private String status;

    public QueueItemDto() {}

    public QueueItemDto(UUID id, String name, int age, String gender, String room, String condition,
                        String priority, LocalDateTime admissionTime, String waitTime, String status) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.room = room;
        this.condition = condition;
        this.priority = priority;
        this.admissionTime = admissionTime;
        this.waitTime = waitTime;
        this.status = status;
    }

    // Getters and setters omitted for brevity
} 