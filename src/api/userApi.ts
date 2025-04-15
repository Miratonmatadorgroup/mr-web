import { UpdateUserPayload, User } from "@/types/user";
import { ClientGetApi, ClientPostApi, ClientPutApi } from "./clients";
import { ApiResponse, VerifyOtp } from "@/types/auth";

const userApi = {
  getUser: async (userId: string): Promise<ApiResponse<User>> => {
    const response = await ClientGetApi(`/users`, userId);
    return response;
  },
  updateUser: async (
    userId: string,
    data: UpdateUserPayload
  ): Promise<ApiResponse<User>> => {
    const response = await ClientPutApi(`/users/`, userId, data);
    return response;
  },
  verifyOtp: async (data: VerifyOtp): Promise<ApiResponse> => {
    const response = await ClientPostApi(`/users/verify-otp`, data);
    return response;
  }
};

export default userApi;
