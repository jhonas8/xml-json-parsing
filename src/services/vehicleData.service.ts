import { VehiclesData } from '../database/models';
import { Response } from '../@types/response';

export const vehicleDataService = {
    getVehicleDataByMakeId: async (makeId: string): Promise<Response.IVehiclesData | null> => {
        return VehiclesData.findOne({ makeId });
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
    }
};
