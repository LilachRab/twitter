import { NextFunction, Request, Response, Router } from 'express';
import { OK_STATUS } from '../constants';
import { addLike, getComments, getPosts, insertNewPost, removeLike } from '../services';

export const createPostRouter = () => {
    const postRouter = Router();

    postRouter.get('/:sortBy', async (req: Request, res: Response, _next: NextFunction) => {
        const posts = await getPosts(req.params.sortBy);
        res.status(OK_STATUS).send(posts);
    });

    postRouter.get('/:id/comments/:sortBy', async (req: Request, res: Response, _next: NextFunction) => {
        const comments = await getComments(parseInt(req.params.id), req.params.sortBy);
        res.status(OK_STATUS).send(comments);
    });

    postRouter.post('/create', async (req: Request, res: Response, _next: NextFunction) => {
        await insertNewPost(req.body, req.body.userName.id);
        res.status(OK_STATUS).send('Post added successfuly');
    });

    postRouter.post('/:id/likes', async (req: Request, res: Response, _next: NextFunction) => {
        await addLike(req.body.userName.id, parseInt(req.params.id));
        res.status(OK_STATUS).send('Like added successfuly');
    });

    postRouter.delete('/:id/likes', async (req: Request, res: Response, _next: NextFunction) => {
        await removeLike(req.body.userName.id, parseInt(req.params.id));
        res.status(OK_STATUS).send('Like deleted successfuly');
    });

    return postRouter;
};
