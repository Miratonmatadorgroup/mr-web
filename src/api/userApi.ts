import { UpdateUserPayload, User } from "@/types/user";
import { ClientGetApi, ClientPutApi } from "./clients";
import { ApiResponse } from "@/types/auth";

const userApi = {
  getUser: async (userId: string): Promise<ApiResponse<User>> => {
    const response = await ClientGetApi(`/users`, userId);
    return response.data;
  },
  updateUser: async (
    userId: string,
    data: UpdateUserPayload
  ): Promise<ApiResponse<User>> => {
    const response = await ClientPutApi(`/users/`, userId, data);
    return response.data;
  },
};

export default userApi;
