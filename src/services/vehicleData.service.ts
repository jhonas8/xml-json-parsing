import { VehiclesData, Makes, VehicleTypes } from '../database/models';
import { Response } from '../@types/response';
import { Clients } from '../@types/clients';
import { createVpicClient } from '../clients/vPIC';

export const vehicleDataService = {
    getVehicleDataByMakeId: async (makeId: string): Promise<Response.IVehiclesData | null> => {
        const [make, vehicleTypes] = await Promise.all([
            Makes.findOne({ makeId }),
            vehicleDataService.getVehicleTypes(makeId)
        ]);

        if (!make || vehicleTypes.length === 0) {
            return null;
        }

        return {
            makeId: make.makeId,
            makeName: make.makeName,
            vehicleTypes: vehicleTypes.map(type => ({
                typeId: type.VehicleTypeId[0],
                typeName: type.VehicleTypeName[0]
            }))
        }
    },

    getAllVehicleData: async (page?: number, limit?: number): Promise<Response.IVehiclesData[]> => {
        if (page !== undefined && limit !== undefined) {
            return VehiclesData.find()
                .skip((page - 1) * limit)
                .limit(limit);
        }
        return VehiclesData.find();
    },

    getTotalCount: async (): Promise<number> => {
        return VehiclesData.countDocuments();
    },

    // New methods
    saveMake: async (make: Response.IMakeResponse): Promise<void> => {
        await Makes.findOneAndUpdate(
            { makeId: make.Make_ID[0] },
            {
                makeId: make.Make_ID[0],
                makeName: make.Make_Name[0]
            },
            { upsert: true }
        );
    },

    saveVehicleType: async (vehicleType: Response.IVehicleTypeResponse, makeId: string): Promise<void> => {
        await VehicleTypes.findOneAndUpdate(
            { makeId, typeId: vehicleType.VehicleTypeId[0] },
            {
                makeId,
                typeId: vehicleType.VehicleTypeId[0],
                typeName: vehicleType.VehicleTypeName[0]
            },
            { upsert: true }
        );
    },

    getAllMakes: async (): Promise<Response.IMakeResponse[]> => {
        return Makes.find();
    },

    getVehicleTypes: async (makeId: string): Promise<Response.IVehicleTypeResponse[]> => {
        let vehicleTypes = await VehicleTypes.find({ makeId });

        if (vehicleTypes && vehicleTypes.length !== 0)
            return vehicleTypes.map(type => ({
                VehicleTypeId: [type.typeId],
                VehicleTypeName: [type.typeName]
            }))

        const vpicClient = createVpicClient()

        const vehicleTypeXML = await vpicClient.getVehiclesTypeByMakeId(makeId);
        const fetchedVehicleTypes = vehicleTypeXML.Response.Results[0].VehicleTypesForMakeIds;

        // Save new vehicle types to the database
        await Promise.all(fetchedVehicleTypes.map((type: Response.IVehicleTypeResponse) =>
            VehicleTypes.create({
                makeId,
                typeId: type.VehicleTypeId[0],
                typeName: type.VehicleTypeName[0]
            })
        ));

        return fetchedVehicleTypes

    }
};
