import { Request, Response, NextFunction } from 'express';

export const asyncWrapper = <T>(
    handler: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        handler(req, res, next).catch(next);
    };
};
