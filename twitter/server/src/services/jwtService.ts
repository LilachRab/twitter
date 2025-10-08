import jwt from 'jsonwebtoken';
import { BEARER, ENV_VARIABLES, THOUSAND } from '../constants';
import { UnauthorizedError } from '../errors';

export const generateToken = async (userId: string) => {
    return jwt.sign({ id: userId }, ENV_VARIABLES.jwtSecret as string, {
        expiresIn: ENV_VARIABLES.jwtExpiration,
    });
};

export const getToken = async (authorizationHeader: string) => {
    const lowerCaseAuthorizationHeader = authorizationHeader.toLowerCase();
    if (!lowerCaseAuthorizationHeader || !lowerCaseAuthorizationHeader.startsWith(BEARER)) {
        throw new UnauthorizedError('No token provided');
    }

    const token = authorizationHeader.substring(BEARER.length, authorizationHeader.length);
    if (!token) {
        throw new UnauthorizedError('Token not found');
    }

    return token;
};

export const isTokenExpired = async (token: string) => {
    try {
        const { exp } = jwt.decode(token) as { exp: number };
        const expirationDatetimeInMilliseconds = exp * THOUSAND;

        return Date.now() >= expirationDatetimeInMilliseconds;
    } catch (err) {
        return true;
    }
};
