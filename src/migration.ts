import { connectToDatabase } from "./database/connection";
import { fetchDataRoutine } from "./routines/fetchData.routine";
import { populateMongodbRoutine } from "./routines/populateMongodb.routine";

const seedDatabase = async () => {
    await connectToDatabase();

    const data = await fetchDataRoutine();

    await populateMongodbRoutine(data);
};

seedDatabase();
