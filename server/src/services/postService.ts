import { deleteLike, insertLike, insertPost, selectComments, selectPosts } from '../database';
import { ConflictError, NotFoundError } from '../errors';
import { Post, ReturnPost } from '../models/post';
import { isLikeExists, isPostExists, validateUserInput } from '../utils';

const sortingAlgorithm = {
    byDate: (post1: ReturnPost, post2: ReturnPost) => post2.creationDate - post1.creationDate,
    byLikes: (post1: ReturnPost, post2: ReturnPost) => post2.usersLiked.length - post1.usersLiked.length,
};

export const getPosts = async (sortBy: string) => {
    const result = await selectPosts();
    const posts: ReturnPost[] = [];

    for (let i = 0; i < result.rows.length; ++i) {
        posts.push({
            id: result.rows[i].id,
            userName: result.rows[i].username,
            content: result.rows[i].content,
            photoURL: result.rows[i].photourl,
            creationDate: new Date(result.rows[i].creationdate).valueOf(),
            parent: result.rows[i].parent,
            usersLiked: result.rows[i].usersliked ? result.rows[i].usersliked : [],
        });
    }

    sortBy === 'byDate' || null ? posts.sort(sortingAlgorithm.byDate) : posts.sort(sortingAlgorithm.byLikes);

    return posts;
};

export const getComments = async (postID: number, sortBy: string) => {
    await isPostExists(postID);
    const result = await selectComments(postID);
    const comments: ReturnPost[] = [];

    for (let i = 0; i < result.rows.length; ++i) {
        comments.push({
            id: result.rows[i].id,
            userName: result.rows[i].username,
            content: result.rows[i].content,
            photoURL: result.rows[i].photourl,
            creationDate: new Date(result.rows[i].creationdate).valueOf(),
            parent: result.rows[i].parent,
            usersLiked: result.rows[i].usersliked ? result.rows[i].usersliked : [],
        });
    }

    sortBy === 'byDate' || null ? comments.sort(sortingAlgorithm.byDate) : comments.sort(sortingAlgorithm.byLikes);

    return comments;
};

export const insertNewPost = async (reqBody: Post, userName: string) => {
    const { content, creationDate, photoURL, parent } = reqBody;

    await validateUserInput(reqBody);
    await insertPost(userName, content, creationDate, photoURL, parent);
};

export const addLike = async (userName: string, postID: number) => {
    await isPostExists(postID);
    if (await isLikeExists(postID, userName)) {
        throw new ConflictError('Like already exists');
    }

    await insertLike(userName, postID);
};

export const removeLike = async (userName: string, postID: number) => {
    await isPostExists(postID);
    if (!(await isLikeExists(postID, userName))) {
        throw new NotFoundError('Like does not exists');
    }

    await deleteLike(userName, postID);
};
