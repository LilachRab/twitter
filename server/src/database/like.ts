import { pool } from './dbConnection';

export const insertLike = async (userName: string, postID: number) => {
    await pool.query('INSERT INTO twitter.user_like (user_name, post) VALUES ($1, $2)', [userName, postID]);
};

export const deleteLike = async (userName: string, postID: number) => {
    await pool.query('DELETE FROM twitter.user_like WHERE user_name = $1 AND post = $2', [userName, postID]);
};