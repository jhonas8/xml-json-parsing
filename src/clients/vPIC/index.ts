import { createAxiosClient } from "../axios";

import { Clients } from "../../@types/clients";

import { getMakesRequest } from "./makes";
import { getVehiclesTypeRequest } from "./vehicles";

export const createVpicClient = (): Clients.IVpicClient => {
    const axiosClient = createAxiosClient('xml', {
        baseURL: 'https://vpic.nhtsa.dot.gov/api/vehicles'
    });

    const getMakes = async () => getMakesRequest(axiosClient);

    const getVehiclesTypeByMakeId = async (makeId: string) => getVehiclesTypeRequest(axiosClient, { id: makeId });

    return {
        getMakes,
        getVehiclesTypeByMakeId
    }
}

