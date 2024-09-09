import { Router } from 'express';
import { validateAuth } from '../middlewares/validateAuth';
import { publicGraphQLRoute } from './public.route';
import { privateGraphQLRoute } from './private.route';
import { restRoutes } from './rest.route';

const publicRoutes: Router = Router()
const publicRestRoutes: Router = Router()
const privateRoutes: Router = Router().use(validateAuth);

// REST Routes
restRoutes(publicRestRoutes);

// GraphQL Routes
privateGraphQLRoute(privateRoutes);
publicGraphQLRoute(publicRoutes);

export { publicRoutes, privateRoutes, publicRestRoutes };
