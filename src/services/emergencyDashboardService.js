// Stubbed real-time updates via setInterval
const updateInterval = 5000;

const mockBayUpdate = { status: 'All Nominal', issues: 0, nextMaintenance: '2024-08-15' };
const mockIncomingUpdate = { pendingTests: { total: 10, urgent: 3, routine: 7 }, processedToday: { total: 60, criticalPercent: 15 } };
const mockCriticalAlertsUpdate = [
  { id: 1, type: 'Cardiac Arrest', patient: 'Jane Smith', location: 'Ambulance 3', time: '2 mins ago', severity: 'High' },
  { id: 2, type: 'Multiple Trauma', patient: 'Unknown', location: 'Incoming ETA 10m', time: '5 mins ago', severity: 'High' },
];
const mockStaffShiftsUpdate = { doctors: 4, nurses: 8, specialists: 2 };

export const onBayStatus = (callback) => {
  callback(mockBayUpdate);
  const id = setInterval(() => callback(mockBayUpdate), updateInterval);
  return () => clearInterval(id);
};

export const onIncomingPatients = (callback) => {
  callback(mockIncomingUpdate);
  const id = setInterval(() => callback(mockIncomingUpdate), updateInterval);
  return () => clearInterval(id);
};

export const onCriticalAlerts = (callback) => {
  callback(mockCriticalAlertsUpdate);
  const id = setInterval(() => callback(mockCriticalAlertsUpdate), updateInterval);
  return () => clearInterval(id);
};

export const onStaffShifts = (callback) => {
  callback(mockStaffShiftsUpdate);
  const id = setInterval(() => callback(mockStaffShiftsUpdate), updateInterval);
  return () => clearInterval(id);
};

// No persistent socket; disconnect is a no-op
export const disconnect = () => {};