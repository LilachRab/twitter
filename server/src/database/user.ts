import { pool } from './dbConnection';

export const insertUser = async (
    userName: string,
    name: string,
    email: string,
    hashedPassword: string,
    birthDate: string,
    photoURL: string,
    gender: number
) => {
    await pool.query(
        'INSERT INTO twitter.user (user_name, name, email, password, birth_date, photo_url, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [userName, name, email, hashedPassword, birthDate, photoURL, gender]
    );
};

export const selectUser = async(userName: string) => {
    return await pool.query('SELECT * FROM twitter.user WHERE user_name=$1', [userName]);
}