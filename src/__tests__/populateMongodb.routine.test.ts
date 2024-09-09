import { populateMongodbRoutine } from '../routines/populateMongodb.routine';
import { connectToDatabase } from '../database/connection';
import { VehiclesData } from '../database/models';
import { Response } from '../@types/response';

jest.mock('../database/connection');
jest.mock('../database/models');

describe('Populate MongoDB Routine', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('populateMongodbRoutine should insert data into the database', async () => {
        const mockData: Response.IMakeResponse[] = [
            { Make_ID: ['440'], Make_Name: ['ASTON MARTIN'] },
            { Make_ID: ['441'], Make_Name: ['TESLA'] },
        ];

        await populateMongodbRoutine(mockData);

        expect(connectToDatabase).toHaveBeenCalled();
        expect(VehiclesData.insertMany).toHaveBeenCalledWith(mockData, { ordered: false });
    });
});
