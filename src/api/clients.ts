import apiClient from "@/lib/api";
import { ApiResponse } from "@/types/auth";
import { AxiosResponse } from "axios";

// Client API function to get all items
export const ClientGetAllApi = async (
  endpoint: string
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await apiClient.get(endpoint);
  return response.data;
};

// Client API function to get a single item by ID
export const ClientGetApi = async (
  endpoint: string,
  id: string
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await apiClient.get(
    `${endpoint}/${id}`
  );
  return response.data;
};

// Client API function to create a new item
export const ClientPostApi = async (
  endpoint: string,
  data: Record<string, any>
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await apiClient.post(
    endpoint,
    data
  );
  return response.data;
};

// Client API function to update an existing item
export const ClientPutApi = async (
  endpoint: string,
  id: string,
  data: Record<string, any>
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await apiClient.put(
    `${endpoint}/${id}`,
    data
  );
  return response.data;
};

// Client API function to delete an item by ID
export const ClientDeleteApi = async (
  endpoint: string,
  id: string
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await apiClient.delete(
    `${endpoint}/${id}`
  );
  return response.data;
};

// Client API function to upload a file
export const ClientUploadApi = async (
  endpoint: string,
  data: FormData
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await apiClient.post(
    endpoint,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
