import { vehicleDataService } from '../services/vehicleData.service';

export const vehicleDataResolvers = {
    Query: {
        vehicleDataByMakeId: async (_: any, { makeId }: { makeId: string }) => {
            return vehicleDataService.getVehicleDataByMakeId(makeId);
        },
        allVehicleData: async (_: any, { page, limit }: { page?: number, limit?: number }) => {
            const data = await vehicleDataService.getAllVehicleData(page, limit);
            const totalCount = await vehicleDataService.getTotalCount();
            return {
                data,
                totalCount,
                currentPage: page || 1,
                totalPages: page && limit ? Math.ceil(totalCount / limit) : 1
            };
        },
    },
};
