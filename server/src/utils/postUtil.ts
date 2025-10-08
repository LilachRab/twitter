import { DATE_REGEX } from '../constants';
import { pool } from '../database/dbConnection';
import { BadInputError, NotFoundError } from '../errors';
import { Post } from '../models/post';

export const validateUserInput = async (reqBody: Post) => {
    const { content, creationDate, photoURL, parent } = reqBody;

    if (!content || !creationDate) {
        throw new BadInputError('Missing input details, Please provide all the details');
    }
    if (photoURL && !(await isValidImg(photoURL))) {
        throw new BadInputError('Invalid image url');
    }

    if (parent) {
        return isPostExists(parent);
    }
};

export const isPostExists = async (postId: number) => {
    if (!postId) {
        throw new BadInputError('No id provided');
    }

    const foundPostOrComment = await pool.query('SELECT * FROM twitter.post WHERE id=$1', [postId]);
    if (foundPostOrComment.rowCount === 0) {
        throw new NotFoundError('Post does not exists');
    }
};

export const isLikeExists = async (postId: number, userName: string) => {
    const foundLike = await pool.query('SELECT * FROM twitter.user_like WHERE post=$1 AND user_name=$2', [
        postId,
        userName,
    ]);

    return foundLike.rowCount === 0 ? false : true;
};

const isValidImg = async (imageUrl: string) => {
    try {
        const response = await fetch(imageUrl, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');

        return contentType?.startsWith('image/');
    } catch (error) {
        return false;
    }
};
