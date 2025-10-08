import { selectUser } from '../database';
import { NotFoundError } from '../errors';
import { User } from '../models/user';

export const isUserExists = async (userName: string) => {
    const foundUser = await selectUser(userName);

    return foundUser.rowCount === 0 ? false : true;
};

export const getUserById = async (userName: string) => {
    const foundUser = await selectUser(userName);

    if (foundUser.rowCount === 0) {
        throw new NotFoundError('User not found');
    }

    const user: User = {
        userName: foundUser.rows[0].user_name,
        name: foundUser.rows[0].name,
        email: foundUser.rows[0].email,
        password: foundUser.rows[0].password,
        birthDate: foundUser.rows[0].birth_date,
        photoURL: foundUser.rows[0].photo_url,
        gender: foundUser.rows[0].gender,
    };

    return user;
};
