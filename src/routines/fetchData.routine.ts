import { createVpicClient } from "../clients/vPIC"
import { parseXMLData } from "../utils/dataParser"
import { Response } from "../@types/response"
import { Clients } from "../@types/clients";

const enhanceMakeDataWithVehicleTypes = async (make: Response.IMakeResponse, vpicClient: Clients.IVpicClient) => {
    const vehicleTypeXML = await vpicClient.getVehiclesTypeByMakeId(make.Make_ID[0]);
    const vehicleTypes = parseXMLData<Response.IVehicleTypeResponse[]>(vehicleTypeXML.Response.Results[0].VehicleTypesForMakeIds)

    return {
        makeId: make.Make_ID[0],
        makeName: make.Make_Name[0],
        vehicleTypes: vehicleTypes.map(type => ({
            typeId: type.VehicleTypeId[0],
            typeName: type.VehicleTypeName[0],
        }))
    }
}

export const fetchDataRoutine = async (): Promise<Response.IVehiclesData[]> => {
    const vpicClient = createVpicClient()

    const makesXML = await vpicClient.getMakes()
    const makesXMLResults = makesXML.Response.Results[0].AllVehicleMakes

    const makes = parseXMLData<Response.IMakeResponse[]>(makesXMLResults)

    return Promise.all(makes.map((make) => enhanceMakeDataWithVehicleTypes(make, vpicClient)))
}
