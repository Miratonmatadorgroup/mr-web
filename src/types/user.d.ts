import { Roles } from "./auth";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  role: Roles;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
}
