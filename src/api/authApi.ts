import {
  ApiResponse,
  Auth,
  AuthUser,
  RegisterAdmin,
  RegisterUser,
} from "@/types/auth";
import { ClientPostApi } from "./clients";
import { User } from "@/types/user";

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
};

export default authApi;
