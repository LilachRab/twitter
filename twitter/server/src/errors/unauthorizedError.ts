import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
