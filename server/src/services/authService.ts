import bcrypt from 'bcryptjs';
import { generateToken, getUserById, isUserExists } from '.';
import { insertUser } from '../database';
import { ConflictError, UnauthorizedError } from '../errors';
import { User } from '../models/user';
import { validateRegisterInput } from '../utils';

export const register = async (reqBody: User) => {
    const { userName, name, email, password, birthDate, photoURL, gender } = reqBody;

    if (await isUserExists(userName)) {
        throw new ConflictError('User name already exists');
    }

    await validateRegisterInput(reqBody);
    const hashedPassword = await bcrypt.hash(password, 10);
    await insertUser(userName, name, email, hashedPassword, birthDate, photoURL, gender);
};

export const login = async (reqBody: User) => {
    const { userName, password } = reqBody;
    const foundUser = await getUserById(userName);
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordMatch) {
        throw new UnauthorizedError('Incorrect credentials');
    }

    const token = generateToken(foundUser.userName);

    return token;
};
