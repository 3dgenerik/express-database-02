import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/CustomError';

export const catchErrorMiddleware = (
    err: CustomError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    const error = err.formatError();
    res.status(error.statusCode).send(error.message);
};
