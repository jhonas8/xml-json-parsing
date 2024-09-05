import { Request, Response, NextFunction } from 'express';
import { getEnvVar } from '../utils/getEnvVar';

// Function to simulate a real validation
export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const apiToken = getEnvVar('API_TOKEN', 'default_api_token');

    if (!authHeader) {
        return res.status(401).json({ message: 'No authorization header provided' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || token !== apiToken) {
        return res.status(401).json({ message: 'Invalid authorization' });
    }

    // If the token is correct, you can add user information to res.locals
    res.locals.user = { id: 1, username: 'example_user' };

    next();
};
