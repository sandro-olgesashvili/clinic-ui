export interface Doctors {
  id: number;
  name: string;
  surname: string;
  email: string;
  idNumber: string;
  categoryName: string;
  role: string;
}

export interface DoctorProfile {
  id?: number;
}

export interface MyProfile {
  id: number;
  name: string;
  surname: string;
  email: string;
  idNumber: string;
  categoryName: string | null;
  role: string;
}
