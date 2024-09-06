import { Router } from 'express';
import { validateAuth } from '../middlewares/validateAuth';
import { publicGraphQLRoute } from './public.route';
import { privateGraphQLRoute } from './private.route';

const publicRoutes: Router = Router();
const privateRoutes: Router = Router().use(validateAuth);

// GraphQL Routes
privateGraphQLRoute(privateRoutes);
publicGraphQLRoute(publicRoutes);

export { publicRoutes, privateRoutes };
