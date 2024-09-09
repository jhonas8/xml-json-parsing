import { connectToDatabase } from "./database/connection";
import { fetchDataRoutine } from "./routines/fetchData.routine";
import { populateMongodbRoutine } from "./routines/populateMongodb.routine";
import { logAction } from "./utils/logAction";
import { Makes } from "./database/models";

const fetchMakes = async () => {
    // Fetch all documents from the 'makes' collection
    const makes = await logAction('Fetching makes from the database', async () => await Makes.find({}));
    return makes;
};

const seedDatabase = async () => {
    await logAction('Connecting to the database', connectToDatabase);

    const data = await logAction('fetching data', fetchDataRoutine);
    const makes = await fetchMakes();

    // Check if the size of 'makes' is the same as 'data'
    if (makes.length === data.length)
        return console.log('Skipping population: makes collection already has the same amount of data.');

    await logAction('Populating mongo database with the fetched data', async () => await populateMongodbRoutine(data));
};


seedDatabase()
