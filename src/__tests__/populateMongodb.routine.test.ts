import { populateMongodbRoutine } from '../routines/populateMongodb.routine';
import { connectToDatabase } from '../database/connection';
import { VehiclesData } from '../database/models';

jest.mock('../database/connection');
jest.mock('../database/models');

describe('Populate MongoDB Routine', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('populateMongodbRoutine should insert data into the database', async () => {
        const mockData = [
            { makeId: '440', makeName: 'ASTON MARTIN', vehicleTypes: [{ typeId: '2', typeName: 'Passenger Car' }] },
        ];

        await populateMongodbRoutine(mockData);

        expect(connectToDatabase).toHaveBeenCalled();
        expect(VehiclesData.insertMany).toHaveBeenCalledWith(mockData);
    });
});
