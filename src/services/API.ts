
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
export const CookieName = 'miratonrose48594';




const user = 'v1/users/';
const URL=`https://api.miratonroseafrica.com`


// Define route constants
const userRoutes = {
    register_user: user + 'register',
    login: user + 'login',
} as const;

// API endpoints
export const Apis = {
    user: userRoutes,
};

// Generic API response type 
interface ApiResponse<T = any> {
    status: string;
    message?: string;
    error?: boolean
    data?: T;
}

// Client API functions for non-auth requests
export const ClientGetApi = async (endpoint: string): Promise<ApiResponse> => {
    const response: AxiosResponse<ApiResponse> = await axios.get(`${URL}/${endpoint}`);
    return response.data;
};

export const ClientPostApi = async (endpoint: string, data: Record<string, any>): Promise<ApiResponse> => {
    const response: AxiosResponse<ApiResponse> = await axios.post(`${URL}/${endpoint}`, data);
    return response.data;
};

export const ClientPutApi = async (endpoint: string, data: Record<string, any>): Promise<ApiResponse> => {
    const response: AxiosResponse<ApiResponse> = await axios.put(`${URL}/${endpoint}`, data);
    return response.data;
};



// Client API functions for auth requests
export const ClientAuthGetApi = async (endpoint: string): Promise<ApiResponse> => {
    const token = Cookies.get(CookieName) || '';
    const response: AxiosResponse<ApiResponse> = await axios.get(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


export const ClientAuthPostApi = async (endpoint: string, data: Record<string, any>): Promise<ApiResponse> => {
    const token = Cookies.get(CookieName) || '';
    const response: AxiosResponse<ApiResponse> = await axios.post(`${URL}/${endpoint}`, data, { // Fixed to post
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const ClientAuthPutApi = async (endpoint: string, data: Record<string, any>): Promise<ApiResponse> => {
    const token = Cookies.get(CookieName) || '';
    const response: AxiosResponse<ApiResponse> = await axios.put(`${URL}/${endpoint}`, data, { // Fixed to post
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


export const ClientAuthDeletetApi = async (endpoint: string, id: string | number): Promise<ApiResponse> => {
    const token = Cookies.get(CookieName) || '';
    const response: AxiosResponse<ApiResponse> = await axios.delete(`${URL}/${endpoint}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

