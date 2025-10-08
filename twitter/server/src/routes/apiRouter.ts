import { Router } from 'express';
import { verifyUserToken } from '../middleware';
import { createPostRouter } from './postRouter';
import { createUserRouter } from './userRouter';

export const createAPIRouter = () => {
    const apiRouter = Router();

    apiRouter.use('/users', verifyUserToken, createUserRouter());
    apiRouter.use('/posts', verifyUserToken, createPostRouter());

    return apiRouter;
};
