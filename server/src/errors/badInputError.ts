import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class BadInputError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.UNPROCESSABLE_ENTITY);
        Object.setPrototypeOf(this, BadInputError.prototype);
    }
}
