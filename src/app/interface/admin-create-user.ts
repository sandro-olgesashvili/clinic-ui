export interface AdminCreateUser {
  name: string;
  surname: string;
  email: string;
  idNumber: string;
  password: string;
  role: string | null;
  category: null | string;
}
export interface AdminSendEmailChange {
  id: number;
  email: string;
  name: string;
}
export interface AdminUpdateEmailChange {
  id: number;
  email: string;
  confirmationToken: string;
  confirmationTokenEmail: string;
}
export interface UserDelete {
  id: number;
}
export interface IDoctorAppointment {
  id?: number;
}
export interface IDoctorAppointmentAdd {
  id?: number;
  startTime: Date | string;
  endTime: Date | string;
  patientId: null | number;
}
