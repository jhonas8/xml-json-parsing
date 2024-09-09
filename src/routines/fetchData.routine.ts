import { createVpicClient } from "../clients/vPIC"
import { Response } from "../@types/response"
import { Clients } from "../@types/clients";
import { logger } from "../utils/logger";
import { vehicleDataService } from "../services/vehicleData.service";

const enhanceMakeDataWithVehicleTypes = async (make: Response.IMakeResponse, vpicClient: Clients.IVpicClient) => {
    try {
        const vehicleTypes = await vehicleDataService.getVehicleTypes(make.Make_ID[0]);

        return {
            makeId: make.Make_ID[0],
            makeName: make.Make_Name[0],
            vehicleTypes: vehicleTypes.map(type => ({
                typeId: type.VehicleTypeId[0],
                typeName: type.VehicleTypeName[0],
            }))
        }
    } catch (error) {
        logger(`Error fetching vehicle types for make ${make.Make_ID[0]}: ${error}`);
        throw error;
    }
}

export const fetchDataRoutine = async (): Promise<Response.IMakeResponse[]> => {
    const vpicClient = createVpicClient()

    const makesXML = await vpicClient.getMakes()
    const makesXMLResults: Response.IMakeResponse[] = makesXML.Response.Results[0].AllVehicleMakes

    logger(`Fetched makes data. Length: ${makesXMLResults.length}`)

    // Save makes to the database
    await Promise.all(makesXMLResults.map(make => vehicleDataService.saveMake(make)));

    // Fetch makes from the database
    const makes = await vehicleDataService.getAllMakes();

    return makes;
}
