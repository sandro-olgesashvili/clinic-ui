export interface Register {
  name: string;
  surname: string;
  email: string;
  idNumber: string;
  password: string;
}

export interface ConfirmationToken {
  confirmationToken: string;
}

export interface User {
  token: string;
  role: string;
  name: string;
  surname: string;
  image?: string;
}
