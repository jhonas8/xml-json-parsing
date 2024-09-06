export namespace Clients {
    export type TRequestMethod<P = undefined> = P extends undefined
        ? (client: AxiosInstance) => Promise<any>
        : (client: AxiosInstance, params: P) => Promise<any>;


    export interface IAxiosClient {
        requestWithRetry: (config: AxiosRequestConfig, retries?: number) => Promise<AxiosResponse>;
    }

    export interface IVpicClient {
        getMakes: () => Promise<any>;
        getVehiclesTypeByMakeId: (id: string) => Promise<any>;
    }
}
