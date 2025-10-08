import { Outlet, useNavigate } from 'react-router-dom';
import { Auth } from '../../constants';
import { useEffect } from 'react';

export const UnProtectedRoutes = () => {
        const navigate = useNavigate();
        const token = Auth.token;
    
        useEffect(() => {
            if (token) {
                navigate('/feed');
            }
        }, [token, navigate]);
    
    return !token && <Outlet />
};
