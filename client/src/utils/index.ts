import { registerFormInput } from '../components/register/types';
import {
    DIGIT_REGEX,
    EMAIL_REGEX,
    FULLNAME_REGEX,
    LOWERCASE_REGEX,
    MIN_PASSWORD_LENGTH,
    MIN_REGISTER_AGE,
    NAME_RULES,
    PASSWORD_RULES,
    SPECIAL_CHARS_REGEX,
    UPPERCASE_REGEX,
} from '../constants';

export const getPostTiming = (datePosted: Date) => {
    const timeUnits = {
        tenthMinute: 0.1,
        halfMinute: 0.5,
        fiveMinutes: 5,
        tenMinutes: 10,
        twentyMinutes: 20,
        halfAnHour: 30,
        hour: 60,
    };
    const now = new Date();
    const millisecondsOffset = now.getTime() - datePosted.getTime();
    const secondsOffset = Math.floor(millisecondsOffset / 1000);
    const minutesOffset = Math.floor(secondsOffset / 60);
    const hoursOffset = Math.floor(minutesOffset / 60);
    const dayOffset = Math.floor(hoursOffset / 24);

    if (dayOffset >= 30) {
        return 'לפני יותר מחודש';
    }

    if (dayOffset === 1 || (dayOffset === 0 && hoursOffset > 24)) {
        return 'ביום האחרון';
    }

    if (dayOffset === 0) {
        if (minutesOffset <= timeUnits.tenthMinute) {
            return 'ממש עכשיו';
        }
        if (minutesOffset <= timeUnits.halfMinute) {
            return 'בחצי דקה האחרונה';
        }
        if (minutesOffset <= timeUnits.fiveMinutes) {
            return 'ב-5 דקות האחרונות';
        }
        if (minutesOffset <= timeUnits.tenMinutes) {
            return 'ב-10 דקות האחרונות';
        }
        if (minutesOffset <= timeUnits.twentyMinutes) {
            return 'ב-20 דקות האחרונות';
        }
        if (minutesOffset <= timeUnits.halfAnHour) {
            return 'בחצי שעה האחרונה';
        }

        return 'לפני מעל שעה';
    }

    return `לפני ${dayOffset} ימים`;
};

export const validateRegisterForm = async (formData: registerFormInput) => {
    const errors = {
        userName: '',
        name: '',
        email: '',
        birthDate: '',
        gender: '',
        photoURL: '',
        password: '',
        confirmPassword: '',
    };

    if (!isValidPassword(formData.password)) {
        errors.password = PASSWORD_RULES;
    }

    if (ageFromDateOfBirth(formData.birthDate) <= MIN_REGISTER_AGE) {
        errors.birthDate = 'צעיר/ה מידי - מותר להירשם מגיל 13 ומעלה';
    }

    if (formData.password !== formData.confirmPassword) {
        errors.password = 'הסיסמה לא תואמת לאימות סיסמה';
        errors.confirmPassword = 'סיסמה לא תואמת';
    }

    if (!EMAIL_REGEX.test(formData.email)) {
        errors.email = 'מייל לא תקין';
    }

    if (!FULLNAME_REGEX.test(formData.name)) {
        errors.name = NAME_RULES;
    }

    if (formData.photoURL && !(await isValidImg(formData.photoURL))) {
        errors.photoURL = 'קישור תמונה לא תקין';
    }

    return errors;
};

export const isValidImg = async (imageUrl: string) => {
    try {
        const response = await fetch(imageUrl, { method: 'HEAD' });
        const contentType = response.headers.get('content-type');

        return contentType?.startsWith('image/');
    } catch (error) {
        return false;
    }
};

const ageFromDateOfBirth = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        --age;
    }

    return age;
};

const isValidPassword = (password: string) => {
    const hasUppercase = UPPERCASE_REGEX.test(password);
    const hasLowercase = LOWERCASE_REGEX.test(password);
    const hasDigit = DIGIT_REGEX.test(password);
    const hasSpecialChar = SPECIAL_CHARS_REGEX.test(password);

    return password.length < MIN_PASSWORD_LENGTH || !hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar
        ? false
        : true;
};
