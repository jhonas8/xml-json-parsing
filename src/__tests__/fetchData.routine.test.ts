import { fetchDataRoutine } from '../routines/fetchData.routine';
import { vehicleDataService } from '../services/vehicleData.service';
import { createVpicClient } from '../clients/vPIC';

jest.mock('../clients/vPIC');
jest.mock('../services/vehicleData.service');

describe('fetchDataRoutine', () => {
    it('should fetch and save makes data', async () => {
        const mockMakes = [
            { Make_ID: ['440'], Make_Name: ['ASTON MARTIN'] },
            { Make_ID: ['441'], Make_Name: ['TESLA'] },
        ];

        (createVpicClient as jest.Mock).mockReturnValue({
            getMakes: jest.fn().mockResolvedValue({
                Response: { Results: [{ AllVehicleMakes: mockMakes }] },
            }),
        });

        (vehicleDataService.saveMake as jest.Mock).mockResolvedValue(undefined);
        (vehicleDataService.getAllMakes as jest.Mock).mockResolvedValue(mockMakes);

        const result = await fetchDataRoutine();

        expect(result).toHaveLength(2);
        expect(result[0]).toHaveProperty('Make_ID', ['440']);
        expect(result[0]).toHaveProperty('Make_Name', ['ASTON MARTIN']);
        expect(vehicleDataService.saveMake).toHaveBeenCalledTimes(2);
        expect(vehicleDataService.getAllMakes).toHaveBeenCalled();
    });
});
