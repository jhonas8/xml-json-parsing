import { Makes } from '../database/models';
import { Response } from '../@types/response';

jest.mock('../database/models');

// Create a mock object that matches the structure of vehicleDataService
const mockVehicleDataService = {
    getVehicleDataByMakeId: jest.fn(),
    getAllVehicleData: jest.fn(),
    getTotalCount: jest.fn(),
    getVehicleTypes: jest.fn(),
    saveMake: jest.fn(),
    saveVehicleType: jest.fn(),
    getAllMakes: jest.fn(),
};

// Mock the entire module
jest.mock('../services/vehicleData.service', () => ({
    vehicleDataService: mockVehicleDataService
}));

// Import the mocked module
import { vehicleDataService } from '../services/vehicleData.service';

describe('Vehicle Data Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getVehicleDataByMakeId should return vehicle data', async () => {
        const mockMake = { makeId: '440', makeName: 'ASTON MARTIN' };
        const mockVehicleTypes: Response.IVehicleTypeResponse[] = [
            { VehicleTypeId: ['2'], VehicleTypeName: ['Passenger Car'] },
            { VehicleTypeId: ['7'], VehicleTypeName: ['Multipurpose Passenger Vehicle (MPV)'] },
        ];

        (Makes.findOne as jest.Mock).mockResolvedValue(mockMake);
        mockVehicleDataService.getVehicleTypes.mockResolvedValue(mockVehicleTypes);

        mockVehicleDataService.getVehicleDataByMakeId.mockImplementation(async (makeId) => {
            const make = await Makes.findOne({ makeId });
            const vehicleTypes = await vehicleDataService.getVehicleTypes(makeId);
            return {
                makeId: make?.makeId,
                makeName: make?.makeName,
                vehicleTypes: vehicleTypes.map(type => ({
                    typeId: type.VehicleTypeId[0],
                    typeName: type.VehicleTypeName[0],
                })),
            };
        });

        const result = await vehicleDataService.getVehicleDataByMakeId('440');

        expect(result).toEqual({
            makeId: '440',
            makeName: 'ASTON MARTIN',
            vehicleTypes: [
                { typeId: '2', typeName: 'Passenger Car' },
                { typeId: '7', typeName: 'Multipurpose Passenger Vehicle (MPV)' },
            ],
        });
        expect(Makes.findOne).toHaveBeenCalledWith({ makeId: '440' });
        expect(vehicleDataService.getVehicleTypes).toHaveBeenCalledWith('440');
    });

    test('getAllVehicleData should return all vehicle data', async () => {
        const mockVehicleData = [{ makeId: '440', makeName: 'ASTON MARTIN', vehicleTypes: [] }];
        mockVehicleDataService.getAllVehicleData.mockResolvedValue(mockVehicleData);

        const result = await vehicleDataService.getAllVehicleData();
        expect(result).toEqual(mockVehicleData);
    });

    test('getAllVehicleData should handle pagination', async () => {
        const mockVehicleData = [{ makeId: '440', makeName: 'ASTON MARTIN', vehicleTypes: [] }];
        mockVehicleDataService.getAllVehicleData.mockResolvedValue(mockVehicleData);

        const result = await vehicleDataService.getAllVehicleData(1, 10);
        expect(result).toEqual(mockVehicleData);
        expect(mockVehicleDataService.getAllVehicleData).toHaveBeenCalledWith(1, 10);
    });

    test('getTotalCount should return the total count of vehicle data', async () => {
        mockVehicleDataService.getTotalCount.mockResolvedValue(100);

        const result = await vehicleDataService.getTotalCount();
        expect(result).toBe(100);
    });
});
