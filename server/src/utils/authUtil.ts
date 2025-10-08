import { DATE_REGEX, EMAIL_REGEX, FULLNAME_REGEX } from '../constants';
import { BadInputError } from '../errors';
import { User } from '../models/user';

export const validateRegisterInput = async (reqBody: User) => {
    const { userName, name, email, password, birthDate, photoURL, gender } = reqBody;

    if (!userName || !name || !email || !password || !birthDate || !gender) {
        throw new BadInputError('Missing input details, Please provide all user details');
    }
    if (!FULLNAME_REGEX.test(name)) {
        throw new BadInputError('Invalid name');
    }
    if (!EMAIL_REGEX.test(email)) {
        throw new BadInputError('Invalid email');
    }
    if (!DATE_REGEX.test(birthDate)) {
        throw new BadInputError('Invalid date');
    }
    if (photoURL && !(await isValidImg(photoURL))) {
        throw new BadInputError('Invalid image url');
    }
};

const isValidImg = async (imageUrl: string) => {
    try {
        const response = await fetch(imageUrl, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');

        return contentType?.startsWith('image/');
    } catch (error) {
        return false;
    }
};
