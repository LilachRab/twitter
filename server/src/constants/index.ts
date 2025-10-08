import { StatusCodes } from 'http-status-codes';
import { getEnvVariablesSingleton } from '../apiConfig';

export const FULLNAME_REGEX = /^[A-Za-z\u05D0-\u05EA\u200f\u200e]{2,}\s[A-Za-z\u05D0-\u05EA\u200f\u200e]{2,}$/;
export const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const DATE_REGEX = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
export const THOUSAND = 1000;
export const BEARER = 'bearer ';
export const OK_STATUS = StatusCodes.OK;
export const ENV_VARIABLES = getEnvVariablesSingleton();
