package com.medirec.dto;

import jakarta.validation.constraints.NotBlank;

public class TextMessageRequestDto {

    @NotBlank(message = "Message content cannot be blank")
    private String content;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
} 