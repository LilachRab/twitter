import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ENV_VARIABLES } from '../constants';
import { UnauthorizedError } from '../errors';
import { getToken, isTokenExpired } from '../services';

export const verifyUserToken = async (req: Request, _res: Response, next: NextFunction) => {
    const token = await getToken(req.headers['authorization'] || '');

    if (await isTokenExpired(token)) {
        throw new UnauthorizedError('Token expired');
    }

    const user = jwt.verify(token, ENV_VARIABLES.jwtSecret);
    req.body.userName = user;
    next();
};
