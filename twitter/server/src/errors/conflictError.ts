import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class ConflictError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
