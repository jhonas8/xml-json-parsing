import express from 'express';
import { publicRoutes, privateRoutes } from './routes';
import { getEnvVar } from './utils/getEnvVar';

const app = express();
const port = getEnvVar('PORT', '3000');

// Middleware
app.use(express.json());

// Public GraphQL route
app.use('/graphql', publicRoutes);

// Private GraphQL route (authenticated via header)
app.use('/graphql-private', privateRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
