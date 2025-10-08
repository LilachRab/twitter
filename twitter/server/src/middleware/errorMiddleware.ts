import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/customError';

export const errorHandler = async (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.statusCode || 500;

    console.log('error logger\n', err);
    res.status(status).json({
        error: status,
        message: err.message || 'Something went wrong',
    });
};
