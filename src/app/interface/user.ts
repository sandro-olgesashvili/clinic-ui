export interface UserDetail {
  image: string;
  name: string;
  surname: string;
  description: string | null;
}

export interface DoctorDetail {
  image: string;
  name: string;
  surname: string;
  description: string | null;
}

export interface Reservation {
  id: number;
  description: string;
}
