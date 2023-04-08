export interface AdminCreateUser {
  name: string;
  surname: string;
  email: string;
  idNumber: string;
  password: string;
  role: string | null;
  category: null | string;
}
