import { NextFunction, Request, Response, Router } from 'express';
import { OK_STATUS } from '../constants';
import { login, register } from '../services';

export const createAuthRouter = () => {
    const authRouter = Router();

    authRouter.post('/register', async (req: Request, res: Response, _next: NextFunction) => {
        await register(req.body);
        res.status(OK_STATUS).send('Successful Registration');
    });

    authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        const userToken = await login(req.body);
        res.status(OK_STATUS).json(userToken);
    });

    return authRouter;
};
