import express from 'express';
import { createAPIRouter } from './apiRouter';
import { createAuthRouter } from './authRouter';

export const routes = express.Router();

routes.use('/auth', createAuthRouter());
routes.use('/api', createAPIRouter());
