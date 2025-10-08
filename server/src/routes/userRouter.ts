import { NextFunction, Request, Response, Router } from 'express';
import { OK_STATUS } from '../constants';
import { getUserById } from '../services';

export const createUserRouter = () => {
    const userRouter = Router();

    userRouter.get('/:userName', async (req: Request, res: Response, _next: NextFunction) => {
        const user = await getUserById(req.params.userName);
        res.status(OK_STATUS).send(user);
    });

    return userRouter;
};
