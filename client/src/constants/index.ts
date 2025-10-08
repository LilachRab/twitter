import { getCookie } from 'typescript-cookie';

export const Auth = JSON.parse(getCookie('auth') || '{}');
export const PASSWORD_RULES = 'הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה, ספרה ותו מיוחד';
export const NAME_RULES = 'שם מלא צריך להכיל שתי מילים בנות לפחות 2 תווים כל אחת';
export const REQUIRED_FIELD = 'שדה חובה';
export const SORT_BY_DATE = 'byDate';
export const SORT_BY_LIKES = 'byLikes';
export const MIN_PASSWORD_LENGTH = 8;
export const MIN_REGISTER_AGE = 13;
export const SUCCESS_STATUS = 200;
export const FULLNAME_REGEX = /^[A-Za-z\u05D0-\u05EA\u200f\u200e]{2,}\s[A-Za-z\u05D0-\u05EA\u200f\u200e]{2,}$/;
export const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const SPECIAL_CHARS_REGEX = /[!@#$%^&*(),.-_+=;?":{}|<>]/;
export const UPPERCASE_REGEX = /[A-Z]/;
export const LOWERCASE_REGEX = /[a-z]/;
export const DIGIT_REGEX = /\d/;
