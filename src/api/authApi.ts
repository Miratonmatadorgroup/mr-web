import {
  ApiResponse,
  Auth,
  AuthUser,
  RegisterAdmin,
  Roles,
} from "@/types/auth";
import { ClientPostApi } from "./clients";
import { User } from "@/types/user";

export interface RegisterUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phone?: string;
  role: Roles | string;
}

const authApi = {
  signInAdmin: async (auth: Auth): Promise<ApiResponse<AuthUser>> => {
    const response = await ClientPostApi(`/admin/login`, auth);
    return response;
  },

  signUpAdmin: async (data: RegisterAdmin): Promise<ApiResponse<User>> => {
    const response = await ClientPostApi(`/admin/register`, data);
    return response;
  },

  signInUser: async (auth: Auth): Promise<ApiResponse<AuthUser>> => {
    const response = await ClientPostApi(`/users/login`, auth);
    return response;
  },

  signUpUser: async (data: RegisterUser): Promise<ApiResponse<User>> => {
    const response = await ClientPostApi(`/users/register`, data);
    return response;
  },

  forgetPassword: async (email: string): Promise<ApiResponse> => {
    const response = await ClientPostApi(`/forget-password`, { email });
    return response;
  },

  changePassword: async (email: string, token: string, newPassword: string): Promise<ApiResponse> => {
    const response = await ClientPostApi(`/reset-password`, { email, token, newPassword });
    return response;
  }
};

export default authApi;
