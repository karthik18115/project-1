package com.medirec.dto;

public class LabPanelDto {
    private long pendingRequests;
    private long processedResults;

    public LabPanelDto() {}

    public LabPanelDto(long pendingRequests, long processedResults) {
        this.pendingRequests = pendingRequests;
        this.processedResults = processedResults;
    }

    public long getPendingRequests() { return pendingRequests; }
    public void setPendingRequests(long pendingRequests) { this.pendingRequests = pendingRequests; }

    public long getProcessedResults() { return processedResults; }
    public void setProcessedResults(long processedResults) { this.processedResults = processedResults; }
} 