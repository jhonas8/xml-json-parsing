import { parseStringPromise } from "xml2js";
import { Clients } from "../../@types/clients";



export const getVehiclesTypeRequest: Clients.TRequestMethod<{ id: string }> = async (client, params) => {
    const response = await client.requestWithRetry({
        method: 'GET',
        url: `/GetVehicleTypesForMakeId/${params?.id}?format=xml`
    });

    return parseStringPromise(response.data);
}
