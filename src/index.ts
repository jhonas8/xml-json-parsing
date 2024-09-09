import express from 'express';
import { publicRoutes, privateRoutes, publicRestRoutes } from './routes';
import { getEnvVar } from './utils/getEnvVar';
import { connectToDatabase } from './database/connection';
import { logAction } from './utils/logAction';

const app = express();
const port = getEnvVar('PORT', '3000');

// Middleware
app.use(express.json());

// Public GraphQL route
app.use('/graphql', publicRoutes);

// Public REST route
app.use('/rest', publicRestRoutes);
// Private GraphQL route (authenticated via header)
app.use('/graphql-private', privateRoutes);


// Start the server
app.listen(port, async () => {

    await logAction('Connecting to database', connectToDatabase)

    console.log(`Server is running on port ${port}`);
});

