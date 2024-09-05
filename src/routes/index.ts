import { publicGraphQLRoute } from './public.route';
import { privateGraphQLRoute } from './private.route';
import { validateAuth } from '../middlewares/validateAuth';
import { Router } from 'express';

const publicRoutes: Router = Router();
const privateRoutes: Router = Router().use(validateAuth);

privateGraphQLRoute(privateRoutes);

publicGraphQLRoute(publicRoutes);

export { publicRoutes, privateRoutes };
