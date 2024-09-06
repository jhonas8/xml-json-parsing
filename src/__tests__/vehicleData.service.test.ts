import { vehicleDataService } from '../services/vehicleData.service';
import { VehiclesData } from '../database/models';

jest.mock('../database/models');

describe('Vehicle Data Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getVehicleDataByMakeId should return vehicle data', async () => {
        const mockVehicleData = { makeId: '440', makeName: 'ASTON MARTIN', vehicleTypes: [] };
        (VehiclesData.findOne as jest.Mock).mockResolvedValue(mockVehicleData);

        const result = await vehicleDataService.getVehicleDataByMakeId('440');
        expect(result).toEqual(mockVehicleData);
        expect(VehiclesData.findOne).toHaveBeenCalledWith({ makeId: '440' });
    });

    test('getAllVehicleData should return all vehicle data', async () => {
        const mockVehicleData = [{ makeId: '440', makeName: 'ASTON MARTIN', vehicleTypes: [] }];
        (VehiclesData.find as jest.Mock).mockResolvedValue(mockVehicleData);

        const result = await vehicleDataService.getAllVehicleData();
        expect(result).toEqual(mockVehicleData);
        expect(VehiclesData.find).toHaveBeenCalled();
    });

    test('getAllVehicleData should handle pagination', async () => {
        const mockVehicleData = [{ makeId: '440', makeName: 'ASTON MARTIN', vehicleTypes: [] }];
        (VehiclesData.find as jest.Mock).mockReturnValue({
            skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockResolvedValue(mockVehicleData),
            }),
        });

        const result = await vehicleDataService.getAllVehicleData(1, 10);
        expect(result).toEqual(mockVehicleData);
        expect(VehiclesData.find).toHaveBeenCalled();
    });

    test('getTotalCount should return the total count of vehicle data', async () => {
        (VehiclesData.countDocuments as jest.Mock).mockResolvedValue(100);

        const result = await vehicleDataService.getTotalCount();
        expect(result).toBe(100);
        expect(VehiclesData.countDocuments).toHaveBeenCalled();
    });
});
