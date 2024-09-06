import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Response } from '../../@types/response';
import { logger } from '../../utils/logger';
import { Clients } from '../../@types/clients';


export const createAxiosClient = (responseType: Response.ResponseType, options: AxiosRequestConfig = {}): Clients.IAxiosClient => {
    const instance = axios.create({
        headers: {
            'Accept': responseType === 'json' ? 'application/json' : 'application/xml',
        },
        ...options
    });

    // Add logging interceptors, to simulate production monitoring practices
    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error) => {
            logger(`Request failed: ${error.config.url}, Error: ${error.message}`);
            return Promise.reject(error);
        }
    );

    const requestWithRetry = async (config: AxiosRequestConfig, retries: number = 3): Promise<AxiosResponse> => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await instance(config);
                return response;
            } catch (error: unknown) {
                const axiosError = error as AxiosError;
                logger(`Request failed: ${axiosError.config?.url}, Error: ${axiosError.message}, Attempt: ${i + 1}`);
            }
        }

        throw new Error(`Failed to perform the request after ${retries} attempts`);
    };

    return { requestWithRetry };
};


