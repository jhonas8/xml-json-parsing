import { connectToDatabase } from "./database/connection";
import { fetchDataRoutine } from "./routines/fetchData.routine";
import { populateMongodbRoutine } from "./routines/populateMongodb.routine";
import { logAction } from "./utils/logAction";

const seedDatabase = async () => {
    await logAction('Connecting to the database', connectToDatabase)

    const data = await logAction('fetching data', fetchDataRoutine);

    await logAction('Populating mongo database with the fetched data', async () => await populateMongodbRoutine(data));

};

seedDatabase();
