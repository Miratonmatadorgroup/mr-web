export interface Auth {
  identifier: string;
  password: string;
}

export enum Roles {
  admin = "admin",
  manager = "manager",
  houseOwner = "houseOwner",
  user = "user",
}

export interface RegisterAdmin {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phone: string;
}

export interface ApiResponse<T = any> {
  status: string;
  message?: string;
  error?: boolean;
  data?: T;
}

export interface AuthUser {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phone: string;
    role: Roles;
  };
  token: string;
  refreshToken: string;
}

export interface VerifyOtp {
  email: string;
  otp: string;
}
