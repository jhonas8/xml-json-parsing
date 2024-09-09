import { fetchDataRoutine } from './fetchData.routine';
import { connectToDatabase } from '../database/connection';
import { Makes } from '../database/models';
import { Response } from '../@types/response';
import { logAction } from '../utils/logAction';

export const populateMongodbRoutine = async (data: Response.IMakeResponse[]) => {
    await connectToDatabase();


    await logAction('Clearing makes collection', () => Makes.deleteMany({}));
    await logAction('Inserting makes', () => Makes.insertMany(data, { ordered: false }));
};
