import { pool } from './dbConnection';

export const selectPosts = async () => {
    return await pool.query(
        `SELECT twitter.post.id, twitter.post.user_name AS userName, twitter.post.content, twitter.post.creation_date AS creationDate, twitter.post.photo_url AS photoURL, twitter.post.parent, array_remove(ARRAY_AGG(twitter.user_like.user_name), NULL) usersLiked
         FROM twitter.post
         LEFT JOIN twitter.user_like ON twitter.post.id=twitter.user_like.post
         WHERE twitter.post.parent IS NULL
         GROUP BY (twitter.post.id, twitter.user_like.post)`
    );
};

export const selectComments = async (postID: number) => {
    return await pool.query(
        'SELECT twitter.post.id, twitter.post.user_name AS userName, twitter.post.content, twitter.post.creation_date AS creationDate, twitter.post.photo_url AS photoURL, twitter.post.parent, array_remove(ARRAY_AGG(twitter.user_like.user_name), NULL) usersLiked FROM twitter.post LEFT JOIN twitter.user_like ON twitter.post.id=twitter.user_like.post WHERE twitter.post.parent = $1 GROUP BY (twitter.post.id, twitter.user_like.post)',
        [postID]
    );
};

export const insertPost = async (
    userName: string,
    content: string,
    creationDate: string,
    photoURL: string,
    parent: number
) => {
    await pool.query(
        'INSERT INTO twitter.post (user_name, content, creation_date, photo_url, parent) VALUES ($1, $2, $3, $4, $5)',
        [userName, content, new Date(creationDate), photoURL, parent]
    );
};
