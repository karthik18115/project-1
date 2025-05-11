package com.medirec.dto;

public class PharmacyPanelDto {
    private long totalInventoryItems;
    private long lowStockCount;

    public PharmacyPanelDto() {}

    public PharmacyPanelDto(long totalInventoryItems, long lowStockCount) {
        this.totalInventoryItems = totalInventoryItems;
        this.lowStockCount = lowStockCount;
    }

    public long getTotalInventoryItems() { return totalInventoryItems; }
    public void setTotalInventoryItems(long totalInventoryItems) { this.totalInventoryItems = totalInventoryItems; }

    public long getLowStockCount() { return lowStockCount; }
    public void setLowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; }
} 