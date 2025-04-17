import { ClientDeleteApi, ClientGetAllApi, ClientGetApi, ClientPostApi, ClientPutApi } from "./clients";
import { ApiResponse } from "@/types/auth";
import { Property } from "@/types/property";

const propertyApi = {
  getProperty: async (propertyId: string): Promise<ApiResponse<Property>> => {
    const response = await ClientGetApi(`/properties`, propertyId);
    return response;
  },
  getProperties: async (): Promise<ApiResponse<Property[]>> => {
    const response = await ClientGetAllApi(`/properties`);
    return response;
  },
  deleteProperty: async (propertyId: string): Promise<ApiResponse<Property>> => {
    const response = await ClientDeleteApi(`/properties`, propertyId);
    return response;
  },
  updateProperty: async (
    propertyId: string,
    data: Partial<Property>
  ): Promise<ApiResponse<Property>> => {
    const response = await ClientPutApi(`/properties/`, propertyId, data);
    return response;
  },
  createProperty: async (data: Partial<Property>): Promise<ApiResponse<Property>> => {
    const response = await ClientPostApi(`/properties`, data);
    return response;
  },
};

export default propertyApi;
