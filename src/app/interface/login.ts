export interface Login {
  email: string;
  password: string;
}

export interface Update {
  email: string;
}

export interface UpdatePassword {
  email: string;
  password: string;
  confirmationToken: string;
}

export interface LoginTwoFactor {
  email: string;
  password: string;
  twoFactorStr: string;
}
