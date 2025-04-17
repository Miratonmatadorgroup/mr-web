import { House } from "@/types/house";
import { ClientDeleteApi, ClientGetApi, ClientPostApi, ClientPutApi } from "./clients";
import { ApiResponse } from "@/types/auth";

const houseApi = {
  getHouses: async (estateId: string): Promise<ApiResponse<House[]>> => {
    const response = await ClientGetApi(`/houses`, estateId);
    return response;
  },
  deleteHouse: async (houseId: string): Promise<ApiResponse<House>> => {
    const response = await ClientDeleteApi(`/houses`, houseId);
    return response;
  },
  updateHouse: async (
    houseId: string,
    data: Partial<House>
  ): Promise<ApiResponse<House>> => {
    const response = await ClientPutApi(`/houses/`, houseId, data);
    return response;
  },
  createHouse: async (data: Partial<House>): Promise<ApiResponse<House>> => {
    const response = await ClientPostApi(`/houses`, data);
    return response;
  },
};

export default houseApi;
