export interface SendEmailChange {
  id: number;
  email: string;
  name: string;
}
export interface UpdateEmailChange {
  id: number;
  email: string;
  confirmationToken: string;
  confirmationTokenEmail: string;
}
