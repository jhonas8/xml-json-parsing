import { fetchDataRoutine } from '../routines/fetchData.routine';
import { createVpicClient } from '../clients/vPIC';
import { parseXMLData } from '../utils/dataParser';

jest.mock('../clients/vPIC');
jest.mock('../utils/dataParser');

describe('Fetch Data Routine', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('fetchDataRoutine should fetch and process data correctly', async () => {
        const mockMakesXML = { Response: { Results: [{ AllVehicleMakes: [{ Make_ID: ['440'], Make_Name: ['ASTON MARTIN'] }] }] } };
        const mockVehicleTypesXML = { Response: { Results: [{ VehicleTypesForMakeIds: [{ VehicleTypeId: ['2'], VehicleTypeName: ['Passenger Car'] }] }] } };

        (createVpicClient as jest.Mock).mockReturnValue({
            getMakes: jest.fn().mockResolvedValue(mockMakesXML),
            getVehiclesTypeByMakeId: jest.fn().mockResolvedValue(mockVehicleTypesXML),
        });

        (parseXMLData as jest.Mock).mockImplementation((data) => data);

        const result = await fetchDataRoutine();

        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('makeId', '440');
        expect(result[0]).toHaveProperty('makeName', 'ASTON MARTIN');
        expect(result[0].vehicleTypes).toHaveLength(1);
        expect(result[0].vehicleTypes[0]).toHaveProperty('typeId', '2');
        expect(result[0].vehicleTypes[0]).toHaveProperty('typeName', 'Passenger Car');
    });
});
