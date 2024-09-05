import { Request, Response, NextFunction } from 'express';

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const password = process.env.API_PASSWORD || 'default_password';

    if (!authHeader) {
        return res.status(401).json({ message: 'No authorization header provided' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid authorization header format' });
    }

    if (token !== password) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // If the password is correct, you can add user information to res.locals
    res.locals.user = { id: 1, username: 'example_user' };

    next();
};
