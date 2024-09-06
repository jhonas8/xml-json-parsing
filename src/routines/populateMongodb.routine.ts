import { fetchDataRoutine } from './fetchData.routine';
import { connectToDatabase } from '../database/connection';
import { VehiclesData } from '../database/models';
import { Response } from '../@types/response';

export const populateMongodbRoutine = async (data: Response.IVehiclesData[]) => {
    await connectToDatabase();

    await VehiclesData.insertMany(data);
};
