import { NavigateFunction } from 'react-router-dom';
import { removeCookie } from 'typescript-cookie';

export const logOut = (navigate: NavigateFunction) => {
    removeCookie('auth');
    navigate('/');
    window.location.reload();
};
