import { Clients } from "../../@types/clients";
import { parseStringPromise } from "xml2js";

export const getMakesRequest: Clients.TRequestMethod = async (client: Clients.IAxiosClient) => {
    const response = await client.requestWithRetry({
        method: 'GET',
        url: '/getallmakes?format=XML'
    });

    return parseStringPromise(response.data);
}
