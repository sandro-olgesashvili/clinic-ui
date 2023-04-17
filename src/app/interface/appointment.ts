export interface Appointment {
  id: number;
  startTime: Date | string;
  endTime: Date | string;
  userId: number;
  patientId: null | number;
}
export interface AppointmentSend {
  startTime: Date | string;
  endTime: Date | string;
  patientId: null | number;
}
